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
    field :viewer_participation, JourneysSessionParticipationType

    # == Resolvers
    sig { returns(String) }
    def url
      journeys_session_path(object)
    end

    sig { returns(T.nilable(Journeys::SessionParticipation)) }
    def viewer_participation
      object.participations.find_by(participant_id: journeys_participant_id)
    end

    # == Helpers
    sig { override.returns(::Journeys::Session) }
    def object = super
  end
end
