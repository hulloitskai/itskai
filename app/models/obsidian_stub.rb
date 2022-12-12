# typed: strict
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

  # == Associations
  has_many :incoming_relations,
           class_name: "ObsidianRelation",
           as: :to,
           dependent: :destroy
  has_many :referenced_by, through: :incoming_relations, source: :from

  # == Methods
  sig { override.returns(String) }
  def display_name
    name
  end
end
