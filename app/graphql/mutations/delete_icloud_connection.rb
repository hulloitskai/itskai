# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteICloudConnection < BaseMutation
    # == Resolver
    sig { returns({}) }
    def resolve
      authorize!(to: :destroy?, with: ICloudConnectionPolicy)
      ICloudClient.logout
      {}
    end
  end
end
