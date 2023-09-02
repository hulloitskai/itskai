# typed: strict
# frozen_string_literal: true

module ICloud
  # == Constants
  CREDENTIALS_DIR = T.let(Rails.root.join("tmp/icloud"), Pathname)

  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def iphone_device_id
      ENV["ICLOUD_IPHONE_DEVICE_ID"]
    end

    sig { returns(String) }
    def iphone_device_id!
      iphone_device_id or raise "iPhone device ID not set"
    end
  end
end
