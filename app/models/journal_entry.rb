# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: journal_entries
#
#  id             :uuid             not null, primary key
#  content        :jsonb
#  imported_at    :datetime         not null
#  last_edited_at :datetime         not null
#  started_at     :datetime         not null
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
  # == Attributes
  include Identifiable

  # == Scopes
  scope :with_content, -> {
    T.bind(self, PrivateRelation)
    where.not(content: nil)
  }

  scope :for_import, -> {
    T.bind(self, PrivateRelation)
    select(:id, :imported_at)
  }

  # == Search
  include Searchable

  pg_search_scope :search,
                  against: :title,
                  using: {
                    tsearch: {
                      prefix: true,
                    },
                  }

  sig { params(query: String).returns(PrivateRelation) }
  def search(query) = super

  module CommonRelationMethods
    T::Sig::WithoutRuntime.sig do
      params(query: String).returns(PrivateRelation)
    end
    def search(query) = super
  end

  # == Validation
  validates :notion_page_id, presence: true, uniqueness: true
  validates :title, presence: true
  validates :started_at, :last_edited_at, presence: true

  # == Callbacks
  after_commit :download_later, on: %i[create update], if: :download_required?

  # == Methods: Import
  sig { void }
  def self.import
    pages = JournalService.list_pages(published: true)
    pages.each do |page|
      notion_page_id = page.id
      Rails.error.handle(context: { notion_page_id: }) do
        entry = find_or_initialize_by(notion_page_id:)
        entry.import_attributes_from_notion(page:)
        entry.save!
      rescue => error
        tag_logger do
          logger.error(
            "Failed to import entry with Notion page ID " \
              "`#{notion_page_id}'`: #{error}",
          )
        end
        raise error
      end
    end
    where.not(notion_page_id: pages.map(&:id)).destroy_all
  end

  sig { void }
  def self.import_later
    ImportJournalEntriesJob.perform_later
  end

  sig { returns(T::Boolean) }
  def import_required?
    imported_at < 5.minutes.ago
  end

  sig { params(force: T::Boolean).void }
  def import(force: false)
    return if !force && !import_required?
    page = JournalService.retrieve_page(notion_page_id)
    import_attributes_from_notion(page)
    save!
  end

  sig { params(force: T::Boolean).void }
  def import_later(force: false)
    ImportJournalEntryJob.perform_later(self, force:)
  end

  # == Methods: Download
  sig { returns(T::Boolean) }
  def download_required?
    saved_change_to_last_edited_at? || content.nil?
  end

  sig { void }
  def download
    content = JournalService.retrieve_blocks(notion_page_id)
    update!(content:)
  end

  sig { void }
  def download_later
    DownloadJournalEntryJob.perform_later(self)
  end

  # == Helpers: Import
  sig { params(page: T.untyped).void }
  def import_attributes_from_notion(page:)
    properties = page.properties
    self.imported_at = Time.current
    self.title = properties["Name"].title.first!.plain_text
    self.started_at = properties["Created At"].created_time.to_time
    self.last_edited_at = properties["Modified At"].last_edited_time.to_time
  end
end
