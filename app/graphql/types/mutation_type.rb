# typed: true
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
    field :sync_journal_entries, mutation: Mutations::SyncJournalEntries

    field :activate_scottkit_signal, mutation: Mutations::ActivateScottkitSignal
    field :sync_location, mutation: Mutations::SyncLocation

    # field :import_cookies, mutation: Mutations::ImportCookies
  end
end
