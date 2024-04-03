# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    # == Mutations
    field :test_mutation, mutation: Mutations::TestMutation

    field :request_user_email_verification,
          mutation: Mutations::RequestUserEmailVerification
    field :request_user_password_reset,
          mutation: Mutations::RequestUserPasswordReset
    field :update_user_email, mutation: Mutations::UpdateUserEmail
    field :update_user_profile, mutation: Mutations::UpdateUserProfile

    field :create_icloud_connection,
          mutation: Mutations::CreateICloudConnection
    field :delete_icloud_connection,
          mutation: Mutations::DeleteICloudConnection
    field :verify_icloud_security_code,
          mutation: Mutations::VerifyICloudSecurityCode

    field :delete_google_connection,
          mutation: Mutations::DeleteGoogleConnection
    field :delete_spotify_connection,
          mutation: Mutations::DeleteSpotifyConnection

    field :add_journal_entry_comment,
          mutation: Mutations::AddJournalEntryComment
    field :sync_journal_entries, mutation: Mutations::SyncJournalEntries

    field :like_pensieve_message, mutation: Mutations::LikePensieveMessage
    field :send_pensieve_message, mutation: Mutations::SendPensieveMessage
    field :unlike_pensieve_message, mutation: Mutations::UnlikePensieveMessage

    field :create_location_access, mutation: Mutations::CreateLocationAccess
    field :create_location_access_grant,
          mutation: Mutations::CreateLocationAccessGrant
    field :delete_location_access_grant,
          mutation: Mutations::DeleteLocationAccessGrant

    field :leave_journeys_session,
          mutation: Mutations::LeaveJourneysSession
    field :update_journeys_session_participation,
          mutation: Mutations::UpdateJourneysSessionParticipation

    field :create_timeline_photo_with_timestamp,
          mutation: Mutations::CreateTimelinePhotoWithTimestamp
    field :import_timeline_activities,
          mutation: Mutations::ImportTimelineActivities
    field :import_timeline_photos, mutation: Mutations::ImportTimelinePhotos

    field :create_dishwatch_device, mutation: Mutations::CreateDishwatcherDevice
    field :update_dishwatch_device, mutation: Mutations::UpdateDishwatchDevice

    field :activate_scottkit_signal, mutation: Mutations::ActivateScottkitSignal
    field :sync_location_logs, mutation: Mutations::SyncLocationLogs
  end
end
