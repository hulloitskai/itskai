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
    argument :user_id, ID, loads: Types::UserType

    # == Resolver
    sig do
      override(allow_incompatible: true)
        .params(user: User, attributes: T.untyped).returns(T.any(
          { user: User },
          { errors: InputFieldErrors },
        ))
    end
    def resolve(user:, **attributes)
      authorize!(user, to: :update?)
      if user.update_without_password(**attributes)
        { user: }
      else
        { errors: user.input_field_errors }
      end
    end
  end
end
