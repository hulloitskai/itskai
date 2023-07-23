# typed: true
# frozen_string_literal: true

class ICloudService < ApplicationService
  class << self
    # == Methods
    sig { returns(Client) }
    def client
      checked { instance.client }
    end

    sig { returns(Drive) }
    def drive
      checked { instance.drive }
    end

    sig { returns(Device) }
    def iphone
      checked { instance.iphone }
    end

    sig { params(code: T.nilable(String)).returns(T::Boolean) }
    def verify_security_code(code) = instance.verify_security_code(code)
  end

  # == Configuration
  config_accessor :credentials_dir, default: Rails.root.join("tmp/icloud")

  # == Initialization
  sig { void }
  def initialize
    super
    PyCall.sys.path.append(File.join(__dir__, "icloud_service"))
    @credentials = T.let(@credentials, T.nilable(ICloudCredentials))
    @client = T.let(@client, T.nilable(Client))
  end

  # == Service
  sig { override.returns(T::Boolean) }
  def ready?
    @credentials.present? &&
      @client.present? &&
      !@client.requires_security_code? &&
      super
  end

  sig { override.void }
  def start
    super
    return if disabled?
    Thread.new do
      if Rails.console?
        Rails.logger.silence { load_credentials }
      else
        load_credentials
      end
      authenticate if @credentials.present?
    end
  end

  # == Methods
  sig { returns(String) }
  def iphone_device_id
    @phone_device_id ||= ENV["ICLOUD_IPHONE_DEVICE_ID"] or
      raise "iCloud iPhone device ID not set"
  end

  sig { returns(Client) }
  def client
    @client or raise "Not authenticated (missing client)"
  end

  sig { params(code: T.nilable(String)).returns(T::Boolean) }
  def verify_security_code(code)
    client.verify_security_code(code)
  end

  sig { returns(Drive) }
  def drive = authenticated_client.drive

  sig { returns(T::Array[ICloudService::Device]) }
  def devices = authenticated_client.devices

  sig { returns(Device) }
  def iphone
    iphone = devices.find { |device| device.id == iphone_device_id }
    iphone or raise "iPhone not found"
  end

  private

  # == Attributes
  sig { returns(T.nilable(ICloudCredentials)) }
  attr_reader :credentials

  # == Helpers
  sig { void }
  def authenticate
    @client = Client.new(credentials: credentials!)
  rescue PyCall::PyError => error
    type, message = error.type.__name__, error.value.to_s
    if type == "ConnectionError" &&
        message.include?("Failed to establish a new connection")
      tag_logger do
        logger.warn("Failed to authenticate (bad connection); skipping")
      end
    else
      raise
    end
  end

  sig { void }
  def load_credentials
    @credentials = ICloudCredentials.first
  end

  sig { returns(ICloudCredentials) }
  def credentials!
    credentials or raise "Not authenticated (missing credentials)"
  end

  sig { returns(Client) }
  def authenticated_client
    if client.requires_security_code?
      raise "Not authenticated (requires security code)"
    end
    client
  end
end
