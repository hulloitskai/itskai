# typed: strict
# frozen_string_literal: true

module Mutations
  class DeleteICloudConnection < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Resolver
    sig { returns(Payload) }
    def resolve
      authorize!(to: :destroy?, with: ICloudConnectionPolicy)
      ICloudClient.logout
      Payload.new
    end
  end
end
