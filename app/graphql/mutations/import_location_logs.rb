# typed: strict
# frozen_string_literal: true

module Mutations
  class ImportLocationLogs < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :import?, with: LocationLogPolicy)
      LocationLog.import!
      Payload.new
    end
  end
end
