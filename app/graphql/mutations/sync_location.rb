# typed: true
# frozen_string_literal: true

module Mutations
  class SyncLocation < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { override.returns(Payload) }
    def resolve
      authorize!(to: :sync?, with: LocationPolicy)
      LocationService.sync
      Payload.new
    end
  end
end
