# typed: strict
# frozen_string_literal: true

module Mutations
  class ActivateScottkitSignal < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :signal, Types::ScottkitSignalType

    # == Resolver
    sig { params(signal: Symbol).returns(Payload) }
    def resolve(signal:)
      Scottcall.dial!(signal)
      Payload.new
    end
  end
end
