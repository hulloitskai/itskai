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

    field :remove_icloud_credentials,
          mutation: Mutations::RemoveICloudCredentials
    field :update_icloud_credentials,
          mutation: Mutations::UpdateICloudCredentials
    field :verify_icloud_security_code,
          mutation: Mutations::VerifyICloudSecurityCode

    field :remove_instagram_credentials,
          mutation: Mutations::RemoveInstagramCredentials
    field :update_instagram_credentials,
          mutation: Mutations::UpdateInstagramCredentials

    field :remove_google_credentials,
          mutation: Mutations::RemoveGoogleCredentials
    field :remove_spotify_credentials,
          mutation: Mutations::RemoveSpotifyCredentials

    field :add_journal_entry_comment,
          mutation: Mutations::AddJournalEntryComment
    field :import_journal_entries, mutation: Mutations::ImportJournalEntries

    field :like_pensieve_message, mutation: Mutations::LikePensieveMessage
    field :send_pensieve_message, mutation: Mutations::SendPensieveMessage
    field :unlike_pensieve_message, mutation: Mutations::UnlikePensieveMessage

    field :create_location_access_grant,
          mutation: Mutations::CreateLocationAccessGrant
    field :delete_location_access_grant,
          mutation: Mutations::DeleteLocationAccessGrant

    field :activate_scottkit_signal, mutation: Mutations::ActivateScottkitSignal
    field :create_seneca_mood_log, mutation: Mutations::CreateSenecaMoodLog
    field :import_location_logs, mutation: Mutations::ImportLocationLogs
  end
end
