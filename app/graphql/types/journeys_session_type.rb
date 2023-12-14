# typed: strict
# frozen_string_literal: true

module Types
  class JourneysSessionType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :participation, JourneysSessionParticipationType do
      argument :participant_id, String
    end
    field :participations, [JourneysSessionParticipationType], null: false
    field :started_at, DateTimeType, null: false, method: :created_at
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      journeys_session_url(object)
    end

    sig do
      params(participant_id: String)
        .returns(T.nilable(Journeys::SessionParticipation))
    end
    def participation(participant_id:)
      object.participations.find_by(participant_id:)
    end

    # == Helpers
    sig { override.returns(::Journeys::Session) }
    def object = super
  end
end
