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
    field :announcement, resolver: Queries::Announcement
    field :booted_at, resolver: Queries::BootedAt
    field :image_by_signed_id, resolver: Queries::ImageBySignedId
    field :password_strength, resolver: Queries::PasswordStrength

    field :user, resolver: Queries::User
    field :viewer, resolver: Queries::Viewer

    field :contact_email, resolver: Queries::ContactEmail
    field :currently_playing, resolver: Queries::CurrentlyPlaying
    field :location, resolver: Queries::Location
    field :resume, resolver: Queries::Resume
    field :timezone, resolver: Queries::Timezone

    field :google_credentials, resolver: Queries::GoogleCredentials
    field :icloud_credentials, resolver: Queries::ICloudCredentials
    field :instagram_credentials, resolver: Queries::InstagramCredentials
    field :spotify_credentials, resolver: Queries::SpotifyCredentials

    field :homepage_journal_entry, resolver: Queries::HomepageJournalEntry
    field :journal_entry_comments, resolver: Queries::JournalEntryComments
  end
end
