# typed: strict
# frozen_string_literal: true

module Mutations
  class UpdateUserProfile < BaseMutation
    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :user, Types::UserType

    # == Arguments
    argument :avatar, Types::UploadInputType, required: false
    argument :name, String

    # == Resolver
    sig do
      override.params(attributes: T.untyped).returns(T.any(
        { user: User },
        { errors: InputFieldErrors },
      ))
    end
    def resolve(**attributes)
      user = current_user!
      if user.update_without_password(**attributes)
        { user: }
      else
        { errors: user.input_field_errors }
      end
    end
  end
end
