# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: journal_entries
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
#  index_journal_entries_on_notion_page_id  (notion_page_id) UNIQUE
#
class JournalEntry < ApplicationRecord
  include Identifiable
  include Searchable

  # == Scopes
  scope :with_content, -> {
    T.bind(self, PrivateRelation)
    where.not(content: nil)
  }

  # == Searchable
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
    SyncJournalEntryJob.perform_later(self, force:)
  end

  sig { void }
  def self.sync!
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
      entry = JournalEntry.find_or_initialize_by(notion_page_id:)
      entry.sync_attributes(notion_page)
      entry.save!
    rescue => error
      tag_logger do
        logger.error(
          "Failed to import entry with Notion page ID `#{notion_page_id}'`: " \
            "#{error}",
        )
      end
      Rails.error.report(error, context: { notion_page_id: })
      raise error
    end
    JournalEntry.where.not(notion_page_id: notion_pages.map(&:id)).destroy_all
  end

  sig { params(notion_page: T.untyped).void }
  def sync_attributes(notion_page)
    notion_page => { properties: }
    self.synced_at = Time.current
    self.title = properties["Name"].title.first!.plain_text
    self.started_at = properties["Created At"].created_time.to_time
    self.last_edited_at = properties["Modified At"].last_edited_time.to_time
  end

  sig { void }
  def self.sync_later
    SyncJournalEntriesJob.perform_later
  end

  # == Downloading
  sig { returns(T::Boolean) }
  def download_required?
    saved_change_to_last_edited_at? || content.nil?
  end

  sig { void }
  def download
    content = NotionClient.retrieve_page_content(notion_page_id)
    redactor = Redactor.new(notion_page)
    redactor.redact_blocks!(content)
    update!(content:)
  end

  sig { void }
  def download_later
    DownloadJournalEntryJob.perform_later(self)
  end

  # == Notion
  sig { returns(String) }
  def self.notion_database_id
    ENV["JOURNAL_ENTRY_NOTION_DATABASE_ID"] or
      raise "Missing journal entries Notion database ID"
  end

  sig { returns(String) }
  def notion_database_id = self.class.notion_database_id

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
end
