# typed: strict
# frozen_string_literal: true

module Mutations
  class TestMutation < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :errors, T.nilable(InputFieldErrors)
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
        th = Thread.new do
          Rails.application.executor.wrap do
            TestMailer
              .test_email(model, current_user: active_user)
              .deliver_now
          end
        end
        ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
          th.join
        end
        Payload.new(model:)
      else
        Payload.new(errors: model.input_field_errors)
      end
    end
  end
end
