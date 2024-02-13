# typed: strict
# frozen_string_literal: true

module Types
  class ICloudConnectionStatusType < BaseEnum
    # == Values
    value "CONNECTED", value: :connected
    value "DISCONNECTED", value: :disconnected
    value "REQUIRES_2FA", value: :requires_2fa
  end
end
