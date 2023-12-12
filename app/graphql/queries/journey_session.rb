# typed: strict
# frozen_string_literal: true

module Queries
  class JourneySession < BaseQuery
    include AllowsFailedLoads

    # == Type
    type Types::JourneySessionType, null: true

    # == Arguments
    argument :id, ID, loads: Types::JourneySessionType, as: :session

    # == Resolver
    sig do
      params(session: T.nilable(::Journey::Session))
        .returns(T.nilable(::Journey::Session))
    end
    def resolve(session:)
      return unless session
      session if allowed_to?(:show?, session)
    end
  end
end
