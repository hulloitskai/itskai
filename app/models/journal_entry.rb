# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: journal_entries
#
#  id             :uuid             not null, primary key
#  blocks         :jsonb
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
  include Identifiable

  # == Scopes
  scope :with_blocks, -> {
    T.bind(self, PrivateRelation)
    where.not(blocks: nil)
  }

  # == Validation
  validates :notion_page_id, presence: true, uniqueness: true
  validates :title, presence: true
  validates :started_at, :last_edited_at, presence: true

  # == Callbacks
  after_commit :import_blocks_later,
               on: %i[create update],
               if: :blocks_import_required?

  # == Methods: Importing
  sig { void }
  def self.import
    pages = JournalService.list_pages(published: true)
    imported_entries = pages.map do |page|
      Rails.error.handle(context: { notion_page_id: page.id }) do
        find_or_initialize_by(notion_page_id: page.id).tap do |entry|
          entry = T.let(entry, JournalEntry)
          entry.update_from_notion(page)
        end
      rescue => error
        tag_logger do
          logger.error(
            "Failed to import entry with Notion page ID `#{page.id}'`: " \
              "#{error}",
          )
        end
        raise error
      end
    end
    imported_entries = T.cast(imported_entries, T::Array[JournalEntry])
    imported_entries.compact!
    where.not(id: imported_entries.map(&:id!)).destroy_all
  end

  sig { void }
  def self.import_later
    ImportJournalEntriesJob.perform_later
  end

  sig { void }
  def import
    page = JournalService.retrieve_page(notion_page_id)
    update_from_notion(page)
  end

  # == Methods: Blocks Importing
  sig { returns(T::Boolean) }
  def blocks_import_required?
    saved_change_to_last_edited_at? || blocks.nil?
  end

  sig { void }
  def import_blocks
    blocks = JournalService.retrieve_blocks(notion_page_id)
    update!(blocks:)
  end

  sig { void }
  def import_blocks_later
    ImportJournalEntryBlocksJob.perform_later(self)
  end

  # == Helpers: Importing
  sig { params(page: T.untyped).void }
  def update_from_notion(page)
    properties = page.properties
    update!(
      imported_at: Time.current,
      title: properties["Name"].title.first!.plain_text,
      started_at: properties["Created At"].created_time.to_time,
      last_edited_at: properties["Modified At"].last_edited_time.to_time,
    )
  end
end
