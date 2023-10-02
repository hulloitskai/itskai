# typed: strict
# frozen_string_literal: true

module Mutations
  class CreateSenecaMoodLog < BaseMutation
    # == Payload
    class Payload < T::Struct
      const :log, T.nilable(SenecaMoodLog)
      const :errors, T.nilable(InputFieldErrors)
    end

    # == Fields
    field :errors, [Types::InputFieldErrorType]
    field :log, Types::SenecaMoodLogType

    # == Arguments
    argument :valence, Integer

    # == Resolver
    sig { override.params(attributes: T.untyped).returns(Payload) }
    def resolve(**attributes)
      log = SenecaMoodLog.new(**attributes)
      if log.save
        Payload.new(log:)
      else
        Payload.new(errors: log.input_field_errors)
      end
    end
  end
end
