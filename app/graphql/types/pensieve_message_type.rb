# typed: true
# frozen_string_literal: true

module Types
  class PensieveMessageType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :from, PensieveMessageFromType, null: false
    field :text, String, null: false
    field :timestamp, Types::DateTimeType, null: false

    # == Resolvers
    sig { returns(Symbol) }
    def from
      object.from.to_sym
    end

    # == Helpers
    sig { override.returns(::PensieveMessage) }
    def object = super
  end
end
