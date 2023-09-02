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

  #   # == Methods
  #   sig { params(credentials: ICloudCredentials).returns(Client) }
  #   def authenticate(credentials)
  #     instance.authenticate(credentials)
  #   end

  #   sig { returns(Client) }
  #   def client
  #     checked { instance.client }
  #   end

  #   sig { returns(Drive) }
  #   def drive = authenticated_client.drive

  #   sig { returns(T::Array[ICloudService::Device]) }
  #   def devices = authenticated_client.devices

  #   sig { returns(Device) }
  #   def iphone
  #     iphone = devices.find { |device| device.id == iphone_device_id }
  #     iphone or raise "iPhone not found"
  #   end

  #   sig { params(code: T.nilable(String)).returns(T::Boolean) }
  #   def verify_security_code(code)
  #     client.verify_security_code(code)
  #   end

  #   private

  #   sig { returns(Client) }
  #   def authenticated_client
  #     if client.requires_security_code?
  #       raise "Not authenticated (requires security code)"
  #     end
  #     client
  #   end
  # end

  # # == Initialization
  # sig { void }
  # def initialize
  #   super
  #   @client = T.let(@client, T.nilable(Client))
  # end

  # # == Lifecycle
  # sig { override.returns(T::Boolean) }
  # def ready?
  #   @client.present? && super
  # end

  # sig { override.void }
  # def start
  #   super
  #   wrapped_thread do
  #     silence_logger_in_console do
  #       credentials = saved_credentials or break
  #       begin
  #         authenticate(credentials)
  #       rescue PyCall::PyError => error
  #         type, message = error.type.__name__, error.value.to_s
  #         if type == "ConnectionError" &&
  #             message.include?("Failed to establish a new connection")
  #           tag_logger do
  #             logger.warn("Failed to authenticate (bad connection); skipping")
  #           end
  #         else
  #           raise
  #         end
  #       end
  #     end
  #   end
  # end

  # # == Methods
  # sig { params(credentials: ICloudCredentials).returns(Client) }
  # def authenticate(credentials)
  #   @client = Client.new(credentials:)
  # end

  # sig { returns(Client) }
  # def client
  #   @client or raise "Missing client"
  # end

  # private

  # # == Helpers
  # sig { returns(T.nilable(ICloudCredentials)) }
  # def saved_credentials
  #   ICloudCredentials.first
  # end
end
