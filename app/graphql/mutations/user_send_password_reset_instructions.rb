# typed: strict
# frozen_string_literal: true

module Mutations
  class UserSendPasswordResetInstructions < BaseMutation
    class Payload < T::Struct
      const :success, TrueClass, default: true
    end

    # == Fields
    field :success, Boolean, null: false

    # == Arguments
    argument :email, String

    # == Resolver
    sig do
      override(
        allow_incompatible: true,
      ).params(
        email: String,
      ).returns(Payload)
    end
    def resolve(email:)
      user = User.find_by(email: email)
      user.send_reset_password_instructions if user.present?
      Payload.new
    end
  end
end
