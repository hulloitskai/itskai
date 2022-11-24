# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_notes
#
#  id          :uuid             not null, primary key
#  aliases     :string           default([]), not null, is an Array
#  analyzed_at :datetime
#  blurb       :string
#  content     :text             not null
#  modified_at :datetime         not null
#  name        :string           not null
#  tags        :string           default([]), not null, is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_obsidian_notes_on_aliases      (aliases)
#  index_obsidian_notes_on_analyzed_at  (analyzed_at)
#  index_obsidian_notes_on_modified_at  (modified_at)
#  index_obsidian_notes_on_name         (name) UNIQUE
#  index_obsidian_notes_on_tags         (tags)
#

class ObsidianNote < ApplicationRecord
  # == Associations ==
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

  # == Concerns ==
  include Identifiable
  include ObsidianEntry

  # == Validations ==
  validates :aliases, :tags, array: { presence: true }

  # == Callbacks ==
  after_commit :analyze_later, on: %i[create update], if: :analysis_required?

  # == Synchronization ==
  sig { params(force: T::Boolean).void }
  def self.synchronize(force: false)
    Obsidian.synchronize_notes(force: force)
  end

  sig { params(force: T::Boolean).void }
  def self.synchronize_later(force: false)
    ObsidianNoteSynchronizationJob.perform_later(force: force)
  end

  sig { params(force: T::Boolean).void }
  def synchronize(force: false)
    Obsidian.synchronize_note(self, force: force)
  end

  # == Analysis ==
  sig { returns(T::Boolean) }
  def analyzed?
    analyzed_at?
  end

  sig { returns(T::Boolean) }
  def analysis_required?
    !analyzed? || T.must(analyzed_at) < modified_at
  end

  sig { void }
  def analyze
    links = T.cast(content.scan(/\[\[[^\[\]]+\]\]/), T::Array[String])
    links.map! do |link|
      link.delete_prefix!("[[")
      link.delete_suffix!("]]")
      link.split("|").first
    end
    links.uniq!
    references = ObsidianNote.where(name: links).select(:id, :name)
    referenced_names = references.map(&:name)
    unresolved_reference_names = links - referenced_names
    unresolved_references =
      unresolved_reference_names.map do |name|
        ObsidianStub.find_or_initialize_by(name: name)
      end
    update!(
      references: references,
      unresolved_references: unresolved_references,
      analyzed_at: Time.current,
    )
  end

  sig { void }
  def analyze_later
    ObsidianNoteAnalyzeJob.perform_later(self)
  end
end
