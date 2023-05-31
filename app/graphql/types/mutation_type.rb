# typed: true
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    # == Mutations
    field :test_mutation, mutation: Mutations::TestMutation

    field :send_user_email_verification_instructions,
          mutation: Mutations::SendUserEmailVerificationInstructions
    field :send_user_password_reset_instructions,
          mutation: Mutations::SendUserPasswordResetInstructions
    field :update_user_email, mutation: Mutations::UpdateUserEmail
    field :update_user_profile, mutation: Mutations::UpdateUserProfile

    field :remove_icloud_credentials,
          mutation: Mutations::RemoveICloudCredentials
    field :update_icloud_credentials,
          mutation: Mutations::UpdateICloudCredentials
    field :verify_icloud_security_code,
          mutation: Mutations::VerifyICloudSecurityCode

    field :activate_scottkit_signal, mutation: Mutations::ActivateScottkitSignal
    field :add_journal_entry_comment,
          mutation: Mutations::AddJournalEntryComment
    field :remove_spotify_credentials,
          mutation: Mutations::RemoveSpotifyCredentials
    field :sync_all_obsidian_notes, mutation: Mutations::SyncAllObsidianNotes
    field :sync_cookies, mutation: Mutations::SyncCookies
  end
end
