# typed: strict
# frozen_string_literal: true

module Mutations
  class TestMutation < BaseMutation
    class Payload < T::Struct
      const :errors, T.nilable(ActiveModel::Errors)
      const :model, T.nilable(TestModel)
    end

    field :errors, [Types::ValidationErrorType]
    field :model, Types::TestModelType

    argument :name, String, required: true
    argument :birthday, Types::DateTimeType, required: false

    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      model = TestModel.new(**attributes)
      if model.valid?
        Payload.new(model: model)
      else
        Payload.new(errors: model.errors)
      end
    end
  end
end
