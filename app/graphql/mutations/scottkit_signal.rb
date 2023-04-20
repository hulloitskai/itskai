# typed: true
# frozen_string_literal: true

module Mutations
  class ScottkitSignal < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :type, Types::ScottkitSignalTypeType

    # == Resolver
    sig { override.params(type: Symbol).returns(Payload) }
    def resolve(type:)
      ScottbotService.signal(type)
      Payload.new
    end
  end
end
