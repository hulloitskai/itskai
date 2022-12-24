# rubocop:disable GraphQL/ExtractType
# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    field :test_mutation, mutation: Mutations::TestMutation

    field :user_update, mutation: Mutations::UserUpdate

    field :icloud_credentials_update,
          mutation: Mutations::ICloudCredentialsUpdate
    field :icloud_credentials_verify_security_code,
          mutation: Mutations::ICloudCredentialsVerifySecurityCode

    field :obsidian_note_synchronize,
          mutation: Mutations::ObsidianNoteSynchronize
  end
end
