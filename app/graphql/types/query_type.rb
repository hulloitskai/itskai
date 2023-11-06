# typed: strict
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
    field :contact_email, resolver: Queries::ContactEmail
    field :image_by_signed_id, resolver: Queries::ImageBySignedId
    field :password_strength, resolver: Queries::PasswordStrength

    field :user, resolver: Queries::User
    field :viewer, resolver: Queries::Viewer

    field :currently_playing, resolver: Queries::CurrentlyPlaying
    field :explorations, resolver: Queries::Explorations
    field :location, resolver: Queries::Location
    field :resume, resolver: Queries::Resume
    field :timezone, resolver: Queries::Timezone

    field :google_credentials, resolver: Queries::GoogleCredentials
    field :icloud_credentials, resolver: Queries::ICloudCredentials
    field :instagram_credentials, resolver: Queries::InstagramCredentials
    field :spotify_credentials, resolver: Queries::SpotifyCredentials

    field :journal_entry, resolver: Queries::JournalEntry
    field :journal_entry_comments, resolver: Queries::JournalEntryComments

    field :location_access_grants, resolver: Queries::LocationAccessGrants
    field :pensieve_messages, resolver: Queries::PensieveMessages
  end
end
