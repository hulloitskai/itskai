# typed: strict
# frozen_string_literal: true

module Types
  module ObsidianEntryType
    include Types::BaseInterface

    # == Configuration
    orphan_types Types::ObsidianStubType

    # == Interfaces
    implements NodeType

    # == Fields
    field :created_at, DateTimeType, null: false
    field :name, String, null: false
    field :title, String, null: false
    field :referenced_by,
          [ObsidianNoteType],
          null: false,
          authorized_scope: true
    field :updated_at, DateTimeType, null: false
  end
end
