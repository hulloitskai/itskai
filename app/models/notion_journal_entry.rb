# typed: true
# frozen_string_literal: true

# rubocop:disable Layout/LineLength, Lint/RedundantCopDisableDirective
# == Schema Information
#
# Table name: notion_journal_entries
#
#  id             :uuid             not null, primary key
#  content        :jsonb
#  last_edited_at :datetime         not null
#  started_at     :datetime         not null
#  synced_at      :datetime         not null
#  title          :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  notion_page_id :string           not null
#
# Indexes
#
#  index_notion_journal_entries_on_notion_page_id  (notion_page_id) UNIQUE
#  index_notion_journal_entries_on_started_at      (started_at)
#
# rubocop:enable Layout/LineLength, Lint/RedundantCopDisableDirective
class NotionJournalEntry < ApplicationRecord
  include PgSearch::Model

  # == Scopes
  scope :with_content, -> { where.not(content: nil) }
  scope :ordered, -> { order(started_at: :desc) }

  # == Search
  pg_search_scope :search,
                  against: :title,
                  using: {
                    tsearch: {
                      prefix: true,
                    },
                  }

  # == Validation
  validates :notion_page_id, uniqueness: true, presence: true
  validates :title, presence: true
  validates :started_at, :last_edited_at, presence: true

  # == Callbacks
  after_commit :download_later, on: %i[create update], if: :download_required?

  # == Synchronization
  sig { returns(T::Boolean) }
  def sync_required?
    synced_at < 5.minutes.ago
  end

  sig { params(force: T::Boolean).void }
  def sync!(force: false)
    return if !force && !sync_required?

    sync_attributes(notion_page)
    save!
  end

  sig { params(force: T::Boolean).void }
  def sync_later(force: false)
    SyncNotionJournalEntryJob.perform_later(self, force:)
  end

  sig { returns(NotionJournalEntrySyncResults) }
  def self.sync
    added, updated = 0, 0
    notion_pages = NotionClient.list_pages(
      notion_database_id,
      filter: {
        "property" => "Published",
        "checkbox" => {
          "equals" => true,
        },
      },
      sorts: [{
        "timestamp" => "created_time",
        "direction" => "descending",
      }],
    )
    notion_pages.each do |notion_page|
      notion_page_id = notion_page.id
      entry = NotionJournalEntry.find_or_initialize_by(notion_page_id:)
      entry.sync_attributes(notion_page)
      if entry.new_record?
        added += 1
      elsif entry.changed?
        updated += 1
      end
      entry.save!
    rescue => error
      with_log_tags do
        logger.error(
          "Failed to import entry with Notion page ID `#{notion_page_id}'`: " \
            "#{error}",
        )
      end
      Rails.error.report(error, context: { notion_page_id: })
      Sentry.capture_exception(error)
      raise
    end
    removed_entries = NotionJournalEntry
      .where.not(notion_page_id: notion_pages.map(&:id))
      .destroy_all
    removed = removed_entries.size
    NotionJournalEntrySyncResults.new(added:, updated:, removed:)
  end

  sig { params(notion_page: T.untyped).void }
  def sync_attributes(notion_page)
    notion_page => { properties: }
    self.synced_at = Time.current
    self.title = properties["Name"].title.first!.plain_text
    self.started_at = if (property = properties["Created At (Display)"].date)
      property.start.to_time
    else
      properties["Created At"].created_time.to_time
    end
    self.last_edited_at = properties["Modified At"].last_edited_time.to_time
  end

  sig { void }
  def self.sync_later
    SyncNotionJournalEntriesJob.perform_later
  end

  # == Downloading
  sig { returns(T::Boolean) }
  def download_required?
    saved_change_to_last_edited_at? || content.nil?
  end

  sig { void }
  def download
    content = NotionClient.retrieve_page_content(notion_page_id)
    redactor = NotionJournalEntryRedactor.new(notion_page)
    redactor.redact_blocks!(content)
    update!(content:)
  end

  sig { void }
  def download_later
    DownloadNotionJournalEntryJob.perform_later(self)
  end

  # == Notion
  sig { returns(String) }
  def self.notion_database_id
    credentials.notion_database_id!
  end

  sig { returns(T.untyped) }
  def notion_page
    NotionClient.retrieve_page(notion_page_id)
  end

  sig { returns(T::Array[T.untyped]) }
  def notion_comments
    NotionClient.list_comments(notion_page_id)
  end

  sig { params(text: String).returns(T.untyped) }
  def create_notion_comment(text)
    NotionClient.create_comment(notion_page_id, text:)
  end

  private

  # == Helpers
  sig { returns(T.untyped) }
  private_class_method def self.credentials
    Rails.application.credentials.notion_journal_entry!
  end
end
