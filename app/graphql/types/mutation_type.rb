# typed: true
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :test_mutation, mutation: Mutations::TestMutation

    field :user_change_email, mutation: Mutations::UserChangeEmail
    field :user_send_email_verification_instructions,
          mutation: Mutations::UserSendEmailVerificationInstructions
    field :user_send_password_reset_instructions,
          mutation: Mutations::UserSendPasswordResetInstructions
    field :user_update, mutation: Mutations::UserUpdate

    field :icloud_credentials_update,
          mutation: Mutations::ICloudCredentialsUpdate
    field :icloud_credentials_verify_security_code,
          mutation: Mutations::ICloudCredentialsVerifySecurityCode

    field :notion_comment_create, mutation: Mutations::NotionCommentCreate
    field :obsidian_note_synchronize,
          mutation: Mutations::ObsidianNoteSynchronize
  end
end
