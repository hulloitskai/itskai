# typed: strict
# frozen_string_literal: true

require_relative "icloud/client"
require_relative "icloud/drive"
require_relative "icloud/railtie"

module ICloud
  # == Configuration
  include ActiveSupport::Configurable

  config_accessor :logger
  config_accessor :credentials_dir

  class << self
    extend T::Sig

    # == Initialization
    sig { void }
    def initialize!
      @client = T.let(@client, T.nilable(ICloud::Client))
      ICloudCredentials.first.try! do |credentials|
        credentials = T.let(credentials, ICloudCredentials)
        authenticate(credentials:)
      end
    end

    # == Methods
    sig { params(credentials: ICloudCredentials).void }
    def authenticate(credentials:)
      @client = Client.new(credentials:)
    rescue PyCall::PyError => error
      type, message = error.type.__name__, error.value.to_s
      if type == "ConnectionError" &&
          message.include?("Failed to establish a new connection")
        tag_logger do
          logger.warn(
            "Failed to authenticate (bad connection); skipping",
          )
        end
      else
        raise
      end
    end

    sig { returns(T::Boolean) }
    def authenticated?
      !(@client.nil? || @client.requires_security_code?)
    end

    sig { params(code: T.nilable(String)).returns(T::Boolean) }
    def verify_security_code(code)
      client.verify_security_code(code)
    end

    sig { returns(Drive) }
    def drive
      authenticated_client.drive
    end

    private

    # == Helpers
    sig { returns(Client) }
    def client
      @client or raise "iCloud client is not initialized"
    end

    sig { returns(Client) }
    def authenticated_client
      raise "iCloud client is not authenticated" unless authenticated?

      client
    end

    sig { params(block: T.proc.void).void }
    def tag_logger(&block)
      if logger.respond_to?(:tagged)
        logger = T.cast(self.logger, ActiveSupport::TaggedLogging)
        logger.tagged(name, &block)
      end
    end
  end

  ActiveSupport.run_load_hooks(:icloud, self)
end
