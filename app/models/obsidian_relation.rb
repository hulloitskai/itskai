# frozen_string_literal: true

# == Schema Information
#
# Table name: obsidian_relations
#
#  id      :uuid             not null, primary key
#  to_type :string           default("nil"), not null
#  from_id :uuid             not null
#  to_id   :uuid             not null
#
# Indexes
#
#  index_obsidian_relations_on_from_id  (from_id)
#  index_obsidian_relations_on_to_id    (to_id)
#  index_obsidian_relations_uniqueness  (from_id,to_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (from_id => obsidian_notes.id)
#
class ObsidianRelation < ApplicationRecord
  include Identifiable

  # == Associations
  belongs_to :from, class_name: "ObsidianNote", inverse_of: :outgoing_relations
  belongs_to :to, polymorphic: true

  # == Validations
  validates :to_type, inclusion: { in: %w[ObsidianNote ObsidianStub] }
end
