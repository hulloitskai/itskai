# typed: strict
# frozen_string_literal: true

module Types
  class SpotifyJamSessionType < BaseObject
    # == Fields
    field :id, String, null: false
    field :join_url, String, null: false

    # # == Helpers
    # sig { override.returns(SpotifyJamSession) }
    # def object = super
  end
end
