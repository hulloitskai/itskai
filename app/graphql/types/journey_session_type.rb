# typed: strict
# frozen_string_literal: true

module Types
  class JourneySessionType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :participations, [JourneySessionParticipationType], null: false
    field :started_at, DateTimeType, null: false, method: :created_at
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      journey_session_url(object)
    end

    # == Helpers
    sig { override.returns(::Journey::Session) }
    def object = super
  end
end
