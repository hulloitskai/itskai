# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: journeys_sessions
#
#  id         :uuid             not null, primary key
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_journeys_sessions_on_slug  (slug) UNIQUE
#
module Journeys
  class Session < ApplicationRecord
    extend FriendlyId
    include Identifiable
    include Slugged

    # == Attributes
    attribute :slug, :string, default: -> { generate_slug }

    # == Associations
    has_many :participations,
             class_name: "SessionParticipation",
             dependent: :destroy

    # == Validations
    validates :participations,
              presence: true

    # == Scopes
    scope :active, -> {
      T.bind(self, PrivateRelation)
      where("created_at > ?", 1.hour.ago)
    }

    # == FriendlyId
    friendly_id :slug
  end
end
