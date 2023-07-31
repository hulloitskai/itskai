# typed: true
# frozen_string_literal: true

class ICloudService < ApplicationService
  class << self
    # == Lifecycle
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = iphone_device_id.nil? || super
    end

    # == Settings
    sig { returns(T.nilable(String)) }
    def iphone_device_id
      setting("IPHONE_DEVICE_ID")
    end

    sig { returns(Pathname) }
    def credentials_dir
      @credentials_dir = T.let(@credentials_dir, T.nilable(Pathname))
      @credentials_dir ||= Rails.root.join("tmp/#{service_name}")
    end

    # == Methods
    sig { params(credentials: ICloudCredentials).returns(Client) }
    def authenticate(credentials)
      instance.authenticate(credentials)
    end

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
    def verify_security_code(code)
      instance.verify_security_code(code)
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(@client, T.nilable(Client))
  end

  # == Lifecycle
  sig { override.returns(T::Boolean) }
  def ready?
    @client.present? && !@client.requires_security_code? && super
  end

  sig { override.void }
  def start
    super
    Thread.new do
      silence_logger_in_console do
        credentials = saved_credentials or break
        begin
          authenticate(credentials)
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
      end
    end
  end

  # == Settings
  sig { returns(String) }
  def iphone_device_id
    self.class.iphone_device_id or raise "iPhone device ID not set"
  end

  # == Methods
  sig { params(credentials: ICloudCredentials).returns(Client) }
  def authenticate(credentials)
    @client = Client.new(credentials:)
  end

  sig { returns(Client) }
  def client
    @client or raise "Missing client"
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

  # == Helpers
  sig { returns(T.nilable(ICloudCredentials)) }
  def saved_credentials
    ICloudCredentials.first
  end

  sig { returns(Client) }
  def authenticated_client
    if client.requires_security_code?
      raise "Not authenticated (requires security code)"
    end
    client
  end
end
