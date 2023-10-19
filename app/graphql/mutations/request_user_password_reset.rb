# typed: strict
# frozen_string_literal: true

module Mutations
  class RequestUserPasswordReset < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :email, String

    # == Resolver
    sig { params(email: String).returns(Payload) }
    def resolve(email:)
      user = User.find_by(email: email)
      if user.nil?
        raise GraphQL::ExecutionError,
              "No such user with the given email address."
      end
      user.send_reset_password_instructions
      Payload.new
    end
  end
end
