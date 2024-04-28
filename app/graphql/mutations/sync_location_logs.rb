# typed: strict
# frozen_string_literal: true

module Mutations
  class SyncLocationLogs < BaseMutation
    # == Resolver
    sig { returns({}) }
    def resolve
      authorize!(to: :sync?, with: LocationLogPolicy)
      LocationLog.sync!
      {}
    end
  end
end
