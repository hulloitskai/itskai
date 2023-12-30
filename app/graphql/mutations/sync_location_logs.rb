# typed: strict
# frozen_string_literal: true

module Mutations
  class SyncLocationLogs < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :sync?, with: LocationLogPolicy)
      LocationLog.sync!
      Payload.new
    end
  end
end
