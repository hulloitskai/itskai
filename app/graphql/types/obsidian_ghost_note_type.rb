# typed: strict
# frozen_string_literal: true

module Types
  class ObsidianGhostNoteType < BaseObject
    # == Interfaces ==
    implements GraphQL::Types::Relay::Node
    implements ObsidianEntryType
  end
end
