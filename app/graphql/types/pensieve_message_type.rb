# typed: true
# frozen_string_literal: true

module Types
  class PensieveMessageType < BaseObject
    # == Interfaces
    implements NodeType

    # == Fields
    field :from, PensieveMessageSenderType, null: false
    field :is_edited, Boolean, null: false, method: :edited?
    field :liked_by_viewer, Boolean, null: false
    field :likes, Integer, null: false
    field :text, String, null: false
    field :timestamp, Types::DateTimeType, null: false

    # == Resolvers
    sig { returns(Symbol) }
    def from
      object.from.to_sym
    end

    sig { returns(Integer) }
    def likes
      object.likes.count
    end

    sig { returns(T::Boolean) }
    def liked_by_viewer
      object.liked_by?(session)
    end

    # == Helpers
    sig { override.returns(::PensieveMessage) }
    def object = super
  end
end
