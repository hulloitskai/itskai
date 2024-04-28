# typed: strict
# frozen_string_literal: true

module Mutations
  class ActivateScottkitSignal < BaseMutation
    # == Arguments
    argument :signal, Types::ScottkitSignalType

    # == Resolver
    sig { params(signal: Symbol).returns({}) }
    def resolve(signal:)
      Scottcall.dial!(signal)
      {}
    end
  end
end
