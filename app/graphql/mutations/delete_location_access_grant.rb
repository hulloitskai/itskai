# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteLocationAccessGrant < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :grant_id, ID, loads: Types::LocationAccessGrantType

    # == Resolver
    sig { params(grant: LocationAccessGrant).returns(Payload) }
    def resolve(grant:)
      authorize!(grant, to: :destroy?)
      grant.destroy!
      Payload.new
    end
  end
end
