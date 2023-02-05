# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_stubs
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_obsidian_stubs_on_name  (name) UNIQUE
#

class ObsidianStub < ApplicationRecord
  # == Concerns
  include Identifiable
  include ObsidianEntry

  # == Attributes
  sig { override.returns(String) }
  def title
    name
  end

  # == Associations
  has_many :incoming_relations,
           class_name: "ObsidianRelation",
           as: :to,
           dependent: :destroy
  has_many :referenced_by, through: :incoming_relations, source: :from

  # == Cleanup
  sig { void }
  def self.cleanup
    ObsidianStubCleanupJob.perform_now
  end

  sig { void }
  def self.cleanup_later
    ObsidianStubCleanupJob.perform_later
  end
end
