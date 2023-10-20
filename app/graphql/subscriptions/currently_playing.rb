# typed: strict
# frozen_string_literal: true

module Subscriptions
  class CurrentlyPlaying < BaseSubscription
    # == Type
    type Types::CurrentlyPlayingType, null: true

    # == Callback Handlers
    sig { returns(T.nilable(::CurrentlyPlaying)) }
    def subscribe
      ::CurrentlyPlaying.current
    end

    sig { override.returns(T.nilable(::CurrentlyPlaying)) }
    def update
      ::CurrentlyPlaying.current
    end
  end
end
