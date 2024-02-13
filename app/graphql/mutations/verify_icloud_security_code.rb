# typed: strict
# frozen_string_literal: true

module Mutations
  class VerifyICloudSecurityCode < BaseMutation
    # == Payload
    class Payload < T::Struct; end

    # == Arguments
    argument :code, String

    # == Resolver
    sig { params(code: String).returns(Payload) }
    def resolve(code:)
      authorize!(to: :verify_security_code?, with: ICloudConnectionPolicy)
      ICloudClient.verify_security_code(code)
      Payload.new
    end
  end
end
