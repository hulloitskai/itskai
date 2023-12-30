# typed: strict
# frozen_string_literal: true

module Queries
  class CurrentlyPlaying < BaseQuery
    # == Definition
    type Types::CurrentlyPlayingType, null: true

    # == Resolver
    sig { override.returns(T.nilable(::CurrentlyPlaying)) }
    def resolve
      ::CurrentlyPlaying.current
    end
  end
end
