# typed: strict
# frozen_string_literal: true

module Types
  class JourneySessionParticipationType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :goal, String, null: false
    field :participant_is_viewer, Boolean, null: false
    field :participant_name, String, null: false
    field :session, [JourneySessionType], null: false

    # == Resolvers
    sig { returns(T::Boolean) }
    def participant_is_viewer
      journey_participant_id == object.participant_id
    end

    # == Helpers
    sig { override.returns(::Journey::SessionParticipation) }
    def object = super
  end
end
