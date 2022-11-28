# typed: strict
# frozen_string_literal: true

module Types
  class ObsidianStubType < BaseObject
    # == Interfaces
    implements NodeType
    implements IdentifiableType
    implements ObsidianEntryType
  end
end
