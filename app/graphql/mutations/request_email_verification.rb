# typed: strict
# frozen_string_literal: true

module Mutations
  class RequestEmailVerification < BaseMutation
    # == Arguments
    argument :email, String

    # == Resolver
    sig { params(email: String).returns({}) }
    def resolve(email:)
      user = User.find_by(email: email)
      if user.nil?
        raise GraphQL::ExecutionError,
              "No such user with the given email address."
      end
      if user.confirmed? && !user.pending_reconfirmation?
        raise GraphQL::ExecutionError, "Email address already verified."
      end
      user.send_confirmation_instructions
      {}
    end
  end
end
