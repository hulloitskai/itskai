# typed: strict
# frozen_string_literal: true

module Mutations
  class VerifyICloudSecurityCode < BaseMutation
    # == Arguments
    argument :code, String

    # == Resolver
    sig { params(code: String).returns({}) }
    def resolve(code:)
      authorize!(to: :verify_security_code?, with: ICloudConnectionPolicy)
      ICloudctl.verify_security_code(code)
      {}
    end
  end
end
