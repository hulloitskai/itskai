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
    field :upload_by_signed_id, resolver: Queries::UploadBySignedId

    field :user, resolver: Queries::User
    field :viewer, resolver: Queries::Viewer

    field :currently_playing, resolver: Queries::CurrentlyPlaying
    field :explorations, resolver: Queries::Explorations
    field :location, resolver: Queries::Location
    field :resume, resolver: Queries::Resume
    field :timezone, resolver: Queries::Timezone

    field :google_connection,
          resolver: Queries::GoogleConnection,
          connection: false
    field :icloud_connection,
          resolver: Queries::ICloudConnection,
          connection: false
    field :spotify_connection,
          resolver: Queries::SpotifyConnection,
          connection: false

    field :journal_entry, resolver: Queries::JournalEntry
    field :journal_entry_comments, resolver: Queries::JournalEntryComments

    field :journeys_session, resolver: Queries::JourneysSession
    field :journeys_session_participation,
          resolver: Queries::JourneysSessionParticipation
    field :journeys_sessions, resolver: Queries::JourneysSessions

    field :location_access_grants, resolver: Queries::LocationAccessGrants
    field :pensieve_messages, resolver: Queries::PensieveMessages
    field :timeline_activities,
          resolver: Queries::TimelineActivities
  end
end
