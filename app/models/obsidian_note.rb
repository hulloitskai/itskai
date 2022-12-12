# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_notes
#
#  id           :uuid             not null, primary key
#  aliases      :string           default([]), not null, is an Array
#  analyzed_at  :datetime
#  blurb        :text
#  content      :text             not null
#  display_name :string
#  hidden       :boolean          default(FALSE), not null
#  modified_at  :datetime         not null
#  name         :string           not null
#  plain_blurb  :text
#  published    :boolean          default(FALSE), not null
#  slug         :string           not null
#  tags         :string           default([]), not null, is an Array
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
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
  # == Concerns
  include Identifiable
  include Slugged
  include ObsidianEntry

  # == Concerns: FriendlyId
  include FriendlyId::Concern
  friendly_id :name

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

  # == Validations
  validates :aliases, :tags, array: { presence: true }

  # == Callbacks
  before_save :set_plain_blurb, if: :will_save_change_to_blurb?
  after_commit :analyze_later, on: %i[create update], if: :analysis_required?

  # == Synchronization
  sig { params(force: T::Boolean).void }
  def self.synchronize_all(force: false)
    ObsidianNoteSynchronizationJob.perform_now(force:)
  end

  sig { params(force: T::Boolean).void }
  def self.synchronize_all_later(force: false)
    ObsidianNoteSynchronizationJob.perform_later(force:)
  end

  sig { params(force: T::Boolean).void }
  def synchronize(force: false)
    Obsidian.synchronize_note(self, force:)
  end

  # == Analysis
  sig { params(force: T::Boolean).void }
  def self.analyze_all(force: false)
    ObsidianNoteAnalysisJob.perform_now(force:)
  end

  sig { params(force: T::Boolean).void }
  def self.analyze_all_later(force: false)
    ObsidianNoteAnalysisJob.perform_later(force: force)
  end

  sig { void }
  def analyze
    ObsidianNoteAnalyzeJob.perform_now(self)
  end

  sig { void }
  def analyze_later
    ObsidianNoteAnalyzeJob.perform_later(self)
  end

  sig { returns(T::Boolean) }
  def analyzed?
    analyzed_at?
  end

  sig { returns(T::Boolean) }
  def analysis_required?
    !analyzed? || T.must(analyzed_at) < modified_at
  end

  # == Methods
  sig { override.returns(String) }
  def display_name
    super || aliases.first || name
  end

  private

  # == Callbacks
  sig { void }
  def set_plain_blurb
    self.plain_blurb = blurb.try! do |text|
      text = T.let(text, String)
      text.gsub(/\[\[([^\[\]]+\|)?([^\[\]]+)\]\]/, '\2')
    end
  end
end
