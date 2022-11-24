# rubocop:disable GraphQL/ExtractType
# typed: strict
# frozen_string_literal: true

module Types
  class QueryType < BaseObject
    extend T::Sig
    extend T::Helpers

    # == Relay ==
    # Add 'node' and 'nodes' fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Fields ==
    field :test_echo, resolver: Queries::TestEcho

    field :viewer,
          resolver: Queries::Viewer,
          description: "The currently authenticated user."

    field :resume, resolver: Queries::Resume

    field :contact_email, resolver: Queries::ContactEmail

    field :icloud_credentials, resolver: Queries::ICloudCredentials

    field :obsidian_note, resolver: Queries::ObsidianNote
    field :obsidian_note_by_name, resolver: Queries::ObsidianNoteByName
    field :obsidian_notes, resolver: Queries::ObsidianNotes
    field :recent_obsidian_entries, resolver: Queries::RecentObsidianEntries
  end
end
