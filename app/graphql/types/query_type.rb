# typed: true
# frozen_string_literal: true

module Types
  class QueryType < BaseObject
    # Add `node` and `nodes` fields.
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # == Queries
    field :test_echo, resolver: Queries::TestEcho

    field :activity_status, resolver: Queries::ActivityStatus
    field :booted_at, resolver: Queries::BootedAt
    field :currently_playing, resolver: Queries::CurrentlyPlaying
    field :image_by_signed_id, resolver: Queries::ImageBySignedId
    field :password_strength, resolver: Queries::PasswordStrength

    field :contact_email, resolver: Queries::ContactEmail
    field :location, resolver: Queries::Location
    field :resume, resolver: Queries::Resume
    field :timezone, resolver: Queries::Timezone

    field :user, resolver: Queries::User
    field :viewer, resolver: Queries::Viewer

    field :icloud_credentials, resolver: Queries::ICloudCredentials
    field :spotify_credentials, resolver: Queries::SpotifyCredentials

    field :obsidian_note, resolver: Queries::ObsidianNote
    field :obsidian_note_by_name, resolver: Queries::ObsidianNoteByName
    field :obsidian_notes, resolver: Queries::ObsidianNotes

    field :homepage_journal_entry, resolver: Queries::HomepageJournalEntry
    field :journal_entry_comments, resolver: Queries::JournalEntryComments
  end
end
