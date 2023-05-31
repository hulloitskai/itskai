# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_notes
#
#  id              :uuid             not null, primary key
#  aliases         :string           default([]), not null, is an Array
#  analyzed_at     :datetime
#  blurb           :text
#  content         :text             not null
#  hidden          :boolean          default(FALSE), not null
#  modified_at     :datetime         not null
#  name            :string           not null
#  plain_blurb     :text
#  published       :boolean          default(FALSE), not null
#  slug            :string           not null
#  synchronized_at :datetime
#  tags            :string           default([]), not null, is an Array
#  title           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_obsidian_notes_on_aliases          (aliases)
#  index_obsidian_notes_on_analyzed_at      (analyzed_at)
#  index_obsidian_notes_on_modified_at      (modified_at)
#  index_obsidian_notes_on_name             (name) UNIQUE
#  index_obsidian_notes_on_slug             (slug) UNIQUE
#  index_obsidian_notes_on_synchronized_at  (synchronized_at)
#  index_obsidian_notes_on_tags             (tags)
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

  # == Attributes: Analysis
  sig { returns(T::Boolean) }
  def analyzed? = analyzed_at?

  sig { returns(T::Boolean) }
  def analysis_required?
    synchronized_at = self.synchronized_at or return false
    analyzed_at = self.analyzed_at or return true
    analyzed_at <= synchronized_at
  end

  # == Attributes: Synchronization
  sig { returns(T::Boolean) }
  def synchronized? = synchronized_at?

  sig { returns(T::Boolean) }
  def synchronization_required?
    return false unless ObsidianService.ready?
    file = ObsidianService.note_file(name)
    file.nil? || file.modified_at! > modified_at
  end

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
  def self.analyze_all(force: false)
    AnalyzeRemainingObsidianNotesJob.perform_now(force:)
  end

  sig { params(force: T::Boolean).void }
  def self.analyze_all_later(force: false)
    AnalyzeRemainingObsidianNotesJob.perform_later(force: force)
  end

  sig { void }
  def analyze
    AnalyzeObsidianNoteJob.perform_now(self)
  end

  sig { void }
  def analyze_later
    AnalyzeObsidianNoteJob.perform_later(self)
  end

  # == Methods: Sync
  sig { params(force: T::Boolean).void }
  def self.sync_all(force: false)
    SyncAllObsidianNotesJob.perform_now(force:)
  end

  sig { params(force: T::Boolean).void }
  def self.sync_all_later(force: false)
    SyncAllObsidianNotesJob.perform_later(force:)
  end

  sig { params(force: T::Boolean).void }
  def sync(force: false)
    return if !force && !synchronization_required?
    SyncObsidianNoteJob.perform_now(self, force:)
  end

  sig { params(force: T::Boolean).void }
  def sync_later(force: false)
    SyncObsidianNoteJob.perform_later(self, force:)
  end

  private

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
