# typed: strict
# frozen_string_literal: true

module ICloudServer
  class Status < T::Enum
    enums do
      Disconnected = new("disconnected")
      Requires2FA = new("requires_2fa")
      Connected = new("connected")
    end
  end
end
