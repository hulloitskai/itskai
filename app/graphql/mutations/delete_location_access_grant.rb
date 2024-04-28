# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteLocationAccessGrant < BaseMutation
    # == Arguments
    argument :grant_id, ID, loads: Types::LocationAccessGrantType

    # == Resolver
    sig { params(grant: LocationAccessGrant).returns({}) }
    def resolve(grant:)
      authorize!(grant, to: :destroy?)
      grant.destroy!
      {}
    end
  end
end
