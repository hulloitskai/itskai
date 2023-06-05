# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_notes
#
#  id          :uuid             not null, primary key
#  aliases     :string           default([]), not null, is an Array
#  analyzed_at :datetime
#  blurb       :text
#  content     :text             not null
#  hidden      :boolean          default(FALSE), not null
#  imported_at :datetime
#  modified_at :datetime         not null
#  name        :string           not null
#  plain_blurb :text
#  published   :boolean          default(FALSE), not null
#  slug        :string           not null
#  tags        :string           default([]), not null, is an Array
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_obsidian_notes_on_aliases      (aliases)
#  index_obsidian_notes_on_analyzed_at  (analyzed_at)
#  index_obsidian_notes_on_imported_at  (imported_at)
#  index_obsidian_notes_on_modified_at  (modified_at)
#  index_obsidian_notes_on_name         (name) UNIQUE
#  index_obsidian_notes_on_slug         (slug) UNIQUE
#  index_obsidian_notes_on_tags         (tags)
#
class ObsidianNote < ApplicationRecord
  include Identifiable
  include FriendlyIdentifiable
  include Slugged
  include ObsidianEntry

  # == Configuration
  friendly_id :name

  # == Attribute Annotations
  sig { returns(T::Array[String]) }
  def aliases = super

  sig { returns(T::Array[String]) }
  def tags = super

  # == Attributes
  sig { returns(T::Boolean) }
  def analyzed? = analyzed_at?

  sig { returns(T::Boolean) }
  def imported? = imported_at?

  # == Associations
  has_many :outgoing_relations,
           class_name: "ObsidianRelation",
           inverse_of: :from,
           foreign_key: :from_id,
           dependent: :destroy
  has_many :references,
           through: :outgoing_relations,
           source: :to,
           source_type: "ObsidianNote"
  has_many :unresolved_references,
           through: :outgoing_relations,
           source: :to,
           source_type: "ObsidianStub"

  has_many :incoming_relations,
           class_name: "ObsidianRelation",
           as: :to,
           dependent: :destroy
  has_many :referenced_by, through: :incoming_relations, source: :from

  # == Normalizations
  removes_blanks :blurb
  before_validation :set_title, unless: :title?
  before_validation :set_plain_blurb, if: :will_save_change_to_blurb?

  # == Validations
  validates :name, presence: true
  validates :title, presence: true
  validates :plain_blurb, presence: true, if: :blurb?
  validates :aliases, :tags, array: { presence: true }

  # == Callbacks
  after_commit :analyze_later, on: %i[create update], if: :analysis_required?

  # == Methods: Analysis
  sig { params(force: T::Boolean).void }
  def self.analyze(force: false)
    notes = all
    unless force
      notes = notes
        .where(analyzed_at: nil)
        .or(where("analyzed_at < modified_at"))
    end
    notes.find_each(&:analyze_later)
  end

  sig { params(force: T::Boolean).void }
  def self.analyze_later(force: false)
    AnalyzeObsidianNotesJob.perform_later(force: force)
  end

  sig { returns(T::Boolean) }
  def analysis_required?
    imported_at = self.imported_at or return false
    analyzed_at = self.analyzed_at or return true
    analyzed_at <= imported_at
  end

  sig { void }
  def analyze
    analyze_references
    analyze_blurb
    update!(analyzed_at: Time.current)
  end

  sig { void }
  def analyze_later
    AnalyzeObsidianNoteJob.perform_later(self)
  end

  # == Methods: Importing
  sig { params(force: T::Boolean).void }
  def self.import(force: false)
    note_names = ObsidianService.note_names
    imported_notes = note_names.map do |name|
      Rails.error.handle(context: { name: }) do
        parsed_note = ObsidianService.note!(name)
        find_or_initialize_by(name:).tap do |note|
          note = T.let(note, ObsidianNote)
          note.update_from_obsidian(parsed_note)
          note.analyzed_at = nil if force
        end
      rescue => error
        tag_logger do
          logger.error("Failed to import `#{name}': #{error}")
        end
        raise error
      end
    end
    imported_notes = T.cast(imported_notes, T::Array[ObsidianNote])
    imported_notes.compact!
    where.not(id: imported_notes.map(&:id!)).destroy_all
  end

  sig { params(force: T::Boolean).void }
  def self.import_later(force: false)
    ImportObsidianNotesJob.perform_later(force:)
  end

  sig { returns(T::Boolean) }
  def import_required?
    if ObsidianService.ready?
      file = ObsidianService.note_file(name)
      file.nil? || file.modified_at! > modified_at
    else
      false
    end
  end

  sig { params(force: T::Boolean).void }
  def import(force: false)
    return if !force && !import_required?
    parsed_note = ObsidianService.note(name)
    if parsed_note.nil?
      destroy!
    else
      update_from_obsidian(parsed_note)
    end
  end

  sig { params(force: T::Boolean).void }
  def import_later(force: false)
    ImportObsidianNoteJob.perform_later(self, force:)
  end

  # == Helpers: Importing
  sig { params(parsed_note: ObsidianService::ParsedNote).void }
  def update_from_obsidian(parsed_note)
    meta, content = parsed_note.meta, parsed_note.content
    update!(
      imported_at: Time.current,
      content:,
      **meta.serialize.symbolize_keys,
    )
  end

  private

  # == Helpers: Analysis
  sig { void }
  def analyze_references
    links = T.cast(content.scan(/(?<!\!)\[\[[^\[\]]+\]\]/),
                   T::Array[String])
    links.map! do |link|
      link.delete_prefix("[[").delete_suffix("]]").split("|").first!
    end
    links.uniq!
    references = ObsidianNote.where(name: links).select(:id, :name)
    referenced_names = references.map(&:name)
    unresolved_reference_names = links - referenced_names
    unresolved_references = unresolved_reference_names.map do |name|
      ObsidianStub.find_or_initialize_by(name:)
    end
    self.references = references
    self.unresolved_references = unresolved_references
  end

  sig { void }
  def analyze_blurb
    return if content.blank? || blurb.present?
    root = Markly.parse(content)
    node = T.let(root.first, T.nilable(Markly::Node))
    if node.present? && node.type.in?(%i[paragraph quote])
      blurb = T.let(node.to_plaintext, String)
      self.blurb = blurb.strip.tr("\n", " ").presence
    end
  end

  # == Callback Handlers
  sig { void }
  def set_title
    self.title = aliases.first || name
  end

  sig { void }
  def set_plain_blurb
    self.plain_blurb = blurb.try! do |text|
      text = T.let(text, String)
      text.gsub(/\[\[([^\[\]]+\|)?([^\[\]]+)\]\]/, '\2')
    end
  end
end
