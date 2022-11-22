# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_ghost_notes
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_obsidian_ghost_notes_on_name  (name) UNIQUE
#

class ObsidianGhostNote < ApplicationRecord
  # == Associations ==
  has_many :incoming_relations,
           class_name: "ObsidianRelation",
           as: :to,
           dependent: :destroy
  has_many :referenced_by, through: :incoming_relations, source: :from

  # == Concerns ==
  include Identifiable
  include ObsidianEntry
end
