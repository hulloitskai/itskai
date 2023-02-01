# typed: true
# frozen_string_literal: true

module Mutations
  class TestMutation < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :errors, T.nilable(ActiveModel::Errors)
      const :model, T.nilable(TestModel)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :model, Types::TestModelType

    # == Arguments
    argument :birthday, Types::DateType, required: false
    argument :name, String

    # == Resolver
    sig { override.params(attributes: T.untyped).returns(Payload) }
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
