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

  # == Attributes
  sig { override.params(value: T.nilable(String)).returns(T.nilable(String)) }
  def blurb=(value)
    super(value.presence)
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

  # == Validations
  validates :name, presence: true
  validates :title, presence: true
  validates :plain_blurb, presence: true, if: :blurb?
  validates :aliases, :tags, array: { presence: true }

  # == Callbacks
  before_validation :set_title, unless: :title?
  before_validation :set_plain_blurb, if: :will_save_change_to_blurb?
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

  sig { returns(T::Boolean) }
  def synchronization_required?
    return false unless Obsidian.ready?
    file = Obsidian.note_file(name)
    file.nil? || file.modified_at! > modified_at
  end

  sig { params(force: T::Boolean).void }
  def synchronize(force: false)
    return if !force && !synchronization_required?
    ObsidianNoteSynchronizeJob.perform_now(self, force:)
  end

  sig { params(force: T::Boolean).void }
  def synchronize_later(force: false)
    ObsidianNoteSynchronizeJob.perform_later(self, force:)
  end

  sig { returns(T::Boolean) }
  def synchronized? = synchronized_at?

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
  def analyzed? = analyzed_at?

  sig { returns(T::Boolean) }
  def analysis_required?
    synchronized_at = self.synchronized_at or return false
    analyzed_at = self.analyzed_at or return true
    analyzed_at <= synchronized_at
  end

  private

  # == Callbacks
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
