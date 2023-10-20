# typed: strict
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
#  imported_at :datetime         not null
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
  extend FriendlyId
  include Identifiable
  include Slugged
  include ObsidianEntry

  # == Attributes
  sig { returns(T::Boolean) }
  def analyzed? = analyzed_at?

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

  # == Scopes
  scope :for_import, -> {
    T.bind(self, PrivateRelation)
    select(:id, :name, :imported_at)
  }

  # == Normalizations
  removes_blank :blurb

  # == Validations
  validates :name, presence: true
  validates :title, presence: true
  validates :plain_blurb, presence: true, if: :blurb?
  validates :aliases, :tags, array: { presence: true }

  # == Callbacks
  before_validation :set_title, unless: :title?
  before_validation :set_plain_blurb, if: :will_save_change_to_blurb?
  after_commit :analyze_later, on: %i[create update], if: :analysis_required?

  # == FriendlyId
  friendly_id :name, slug_column: "slug"

  # == Analysis
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
    analyzed_at = self.analyzed_at or return true
    analyzed_at < modified_at
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

  # == Analysis: Helpers
  sig { void }
  private def analyze_references
    links = T.cast(content.scan(/(?<!\!)\[\[[^\[\]]+\]\]/), T::Array[String])
    links.map! do |link|
      link.delete_prefix("[[").delete_suffix("]]").split("|").first!
    end
    links.uniq!
    references = ObsidianNote.where(name: links).select(:id, :name)
    referenced_names = references.map(&:name)
    unresolved_reference_names = links - referenced_names
    unresolved_references = scoped do
      existing_stubs = ObsidianStub.where(name: unresolved_reference_names).to_a
      new_stub_names = unresolved_reference_names - existing_stubs.map(&:name)
      new_stubs = new_stub_names.map { |name| ObsidianStub.new(name:) }
      existing_stubs + new_stubs
    end
    self.references = references
    self.unresolved_references = unresolved_references
  end

  sig { void }
  private def analyze_blurb
    return if content.blank? || blurb.present?
    root = Markly.parse(content)
    node = T.let(root.first, T.nilable(Markly::Node))
    if node.present? && node.type.in?(%i[paragraph quote])
      blurb = T.let(node.to_plaintext, String)
      self.blurb = blurb.strip.tr("\n", " ").presence
    end
  end

  # # == Importing
  # sig { params(force: T::Boolean).void }
  # def self.import(force: false)
  #   note_names = ObsidianService.note_names
  #   note_names.each do |name|
  #     Rails.error.handle(context: { name: }) do
  #       existing_note = for_import.find_by(name:)
  #       if existing_note
  #         if force || existing_note.import_required?
  #           existing_note.import_later(force:)
  #         end
  #       else
  #         parsed_note = ObsidianService.note!(name)
  #         new_note = new(name:)
  #         new_note.import_attributes_from_obsidian(parsed_note:)
  #         new_note.save!
  #       end
  #     rescue => error
  #       tag_logger do
  #         logger.error("Failed to import `#{name}': #{error}")
  #       end
  #       raise error
  #     end
  #   end
  #   where.not(name: note_names).destroy_all
  # end

  # sig { params(force: T::Boolean).void }
  # def self.import_later(force: false)
  #   ImportObsidianNotesJob.perform_later(force:)
  # end

  # sig { returns(T::Boolean) }
  # def import_required?
  #   return false if imported_at > 5.minutes.ago
  #   if ObsidianService.ready?
  #     file = ObsidianService.note_file(name)
  #     file.nil? || file.modified_at! > modified_at
  #   else
  #     false
  #   end
  # end

  # sig { params(force: T::Boolean).void }
  # def import(force: false)
  #   return if !force && !import_required?
  #   parsed_note = ObsidianService.note(name)
  #   if parsed_note.nil?
  #     destroy!
  #   else
  #     import_attributes_from_obsidian(parsed_note:)
  #     save!
  #   end
  # end

  # sig { params(force: T::Boolean).void }
  # def import_later(force: false)
  #   ImportObsidianNoteJob.perform_later(self, force:)
  # end

  # sig { params(parsed_note: ObsidianService::ParsedNote).void }
  # def import_attributes_from_obsidian(parsed_note:)
  #   self.imported_at = Time.current
  #   self.content = parsed_note.content
  #   self.attributes = parsed_note.meta.serialize
  # end

  private

  # == Callback Handlers
  sig { void }
  def set_title
    self.title = aliases.first || name
  end

  sig { void }
  def set_plain_blurb
    self.plain_blurb = if (plain_blurb = blurb)
      plain_blurb.gsub(/\[\[([^\[\]]+\|)?([^\[\]]+)\]\]/, '\2')
    end
  end
end
