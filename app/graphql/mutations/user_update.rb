# typed: strict
# frozen_string_literal: true

module Mutations
  class UserUpdate < BaseMutation
    class Payload < T::Struct
      const :user, T.nilable(User)
      const :errors, T.nilable(ActiveModel::Errors)
    end

    field :errors, [Types::InputFieldErrorType]
    field :user, Types::UserType

    argument :name, String

    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      user = current_user!
      if user.update_without_password(attributes)
        Payload.new(user:)
      else
        Payload.new(errors: user.errors)
      end
    end
  end
end
