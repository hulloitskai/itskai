# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateUserEmail < BaseMutation
    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :user, Types::UserType

    # == Arguments
    argument :current_password, String
    argument :email, String

    # == Resolver
    sig do
      override.params(attributes: T.untyped).returns(T.any(
        { user: User },
        { errors: InputFieldErrors },
      ))
    end
    def resolve(**attributes)
      user = current_user!
      if user.update_with_password(attributes)
        { user: }
      else
        { errors: user.input_field_errors }
      end
    end
  end
end
