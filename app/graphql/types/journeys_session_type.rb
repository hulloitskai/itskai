# typed: strict
# frozen_string_literal: true

module Types
  class JourneysSessionType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :participations, [JourneysSessionParticipationType], null: false
    field :started_at, DateTimeType, null: false, method: :created_at
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      journeys_session_url(object)
    end

    # == Helpers
    sig { override.returns(::Journeys::Session) }
    def object = super
  end
end
