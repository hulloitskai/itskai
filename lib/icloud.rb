# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"

module ICloud
  extend T::Sig

  # == Constants
  CREDENTIALS_DIR = T.let(Rails.root.join("tmp/icloud"), Pathname)

  # == Accessors
  sig { returns(T.nilable(String)) }
  def self.iphone_device_id
    ENV["ICLOUD_IPHONE_DEVICE_ID"]
  end

  sig { returns(String) }
  def self.iphone_device_id!
    iphone_device_id or raise "iPhone device ID not set"
  end
end
