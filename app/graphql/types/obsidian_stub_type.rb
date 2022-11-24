# typed: strict
# frozen_string_literal: true

module Types
  class ObsidianStubType < BaseObject
    # == Interfaces ==
    implements GraphQL::Types::Relay::Node
    implements ObsidianEntryType
  end
end
