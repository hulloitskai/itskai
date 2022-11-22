# rubocop:disable GraphQL/ExtractType
# typed: strict
# frozen_string_literal: true

module Types
  class MutationType < BaseObject
    extend T::Sig
    extend T::Helpers

    field :test_mutation, mutation: Mutations::TestMutation

    field :account_update, mutation: Mutations::AccountUpdate

    field :icloud_credentials_update,
          mutation: Mutations::ICloudCredentialsUpdate
    field :icloud_credentials_verify_security_code,
          mutation: Mutations::ICloudCredentialsVerifySecurityCode
  end
end
