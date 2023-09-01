# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateUserEmail < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :user, T.nilable(User)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :user, Types::UserType

    # == Arguments
    argument :current_password, String
    argument :email, String

    # == Resolver
    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      user = current_user!
      if user.update_with_password(attributes)
        Payload.new(user:)
      else
        Payload.new(errors: user.input_field_errors)
      end
    end
  end
end
