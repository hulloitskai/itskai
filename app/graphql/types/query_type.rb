# typed: true
# frozen_string_literal: true

module Types
  class QueryType < BaseObject
    # == Relay
    # Add `node` and `nodes` fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Queries
    field :test_echo, resolver: Queries::TestEcho

    field :activity_status, resolver: Queries::ActivityStatus
    field :contact_email, resolver: Queries::ContactEmail
    field :currently_playing, resolver: Queries::CurrentlyPlaying
    field :password_strength, resolver: Queries::PasswordStrength
    field :resume, resolver: Queries::Resume
    field :timezone, resolver: Queries::Timezone
    field :viewer, resolver: Queries::Viewer

    field :icloud_credentials, resolver: Queries::ICloudCredentials
    field :linear_credentials, resolver: Queries::LinearCredentials
    field :spotify_credentials, resolver: Queries::SpotifyCredentials

    field :obsidian_note, resolver: Queries::ObsidianNote
    field :obsidian_note_by_name, resolver: Queries::ObsidianNoteByName
    field :obsidian_notes, resolver: Queries::ObsidianNotes

    field :notion_comments, resolver: Queries::NotionComments
    field :notion_entries, resolver: Queries::NotionEntries
  end
end
