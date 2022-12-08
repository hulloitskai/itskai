# typed: strict
# frozen_string_literal: true

module Types
  module ObsidianEntryType
    # == Definition
    include Types::BaseInterface
    orphan_types Types::ObsidianStubType

    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :name, String, null: false
    field :display_name, String, null: false
    field :referenced_by, [ObsidianNoteType], null: false
    field :updated_at, DateTimeType, null: false
  end
end
