# typed: strict
# frozen_string_literal: true

module Types
  class OAuthConnectionStatusType < BaseEnum
    # == Values
    value "CONNECTED", value: :connected
    value "DISCONNECTED", value: :disconnected
  end
end
