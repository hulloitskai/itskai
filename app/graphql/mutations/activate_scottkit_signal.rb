# typed: true
# frozen_string_literal: true

module Mutations
  class ActivateScottkitSignal < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :type, Types::ScottkitSignalTypeType

    # == Resolver
    sig { override.params(type: Symbol).returns(Payload) }
    def resolve(type:)
      # ScottbotService.alert(type)
      ScottcallService.dial(type)
      Payload.new
    end
  end
end
