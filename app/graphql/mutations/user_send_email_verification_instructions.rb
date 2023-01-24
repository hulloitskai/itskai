# typed: strict
# frozen_string_literal: true

module Mutations
  class UserSendEmailVerificationInstructions < BaseMutation
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
      if user.nil?
        raise GraphQL::ExecutionError,
              "No such user with the given email address"
      end
      if !user.confirmed? && !user.pending_reconfirmation?
        raise GraphQL::ExecutionError, "Email address already verified"
      end
      user.send_confirmation_instructions
      Payload.new
    end
  end
end
