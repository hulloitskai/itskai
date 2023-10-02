# typed: strict
# frozen_string_literal: true

module Types
  class SenecaMoodLogType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :valence, Integer, null: false

    # == Helpers
    sig { override.returns(::SenecaMoodLog) }
    def object = super
  end
end
