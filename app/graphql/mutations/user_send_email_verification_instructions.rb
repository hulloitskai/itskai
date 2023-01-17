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
      if user.present?
        if user.pending_reconfirmation?
          user.send_reconfirmation_instructions
        else
          raise GraphQL::ExecutionError, "Email already confirmed."
        end
      end
      Payload.new
    end
  end
end
