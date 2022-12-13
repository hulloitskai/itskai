# typed: strict
# frozen_string_literal: true

module Mutations
  class TestMutation < BaseMutation
    class Payload < T::Struct
      const :errors, T.nilable(ActiveModel::Errors)
      const :model, T.nilable(TestModel)
    end

    field :errors, [Types::InputFieldErrorType]
    field :model, Types::TestModelType

    argument :birthday, Types::DateType, required: false
    argument :name, String

    sig do
      override(
        allow_incompatible: true,
      ).params(
        attributes: T.untyped,
      ).returns(Payload)
    end
    def resolve(**attributes)
      model = TestModel.new(**attributes)
      if model.valid?
        Payload.new(model:)
      else
        Payload.new(errors: model.errors)
      end
    end
  end
end
