# typed: true
# frozen_string_literal: true

module Subscriptions
  class CurrentlyPlaying < BaseSubscription
    # == Configuration
    broadcastable true

    # == Type
    type Types::CurrentlyPlayingType, null: true

    # == Callback handlers
    sig { returns(T.nilable(::CurrentlyPlaying)) }
    def subscribe
      ::CurrentlyPlaying.current
    end

    sig { override.returns(T.nilable(::CurrentlyPlaying)) }
    def update
      if (json = object)
        json = T.let(json, T::Hash[String, T.untyped])
        ::CurrentlyPlaying.from_json(json)
      end
    end
  end
end
