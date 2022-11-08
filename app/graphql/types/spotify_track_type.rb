# typed: strict
# frozen_string_literal: true

module Types
  class SpotifyTrackType < BaseObject
    extend T::Sig

    field :name, String
  end
end
