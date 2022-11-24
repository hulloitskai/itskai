# typed: strict
# frozen_string_literal: true

require_relative "icloud/client"
require_relative "icloud/drive"
require_relative "icloud/railtie"

module ICloud
  # == Configuration ==
  include ActiveSupport::Configurable
  config_accessor :logger
  config_accessor :credentials_dir

  class << self
    extend T::Sig

    # == Init ==
    sig { void }
    def initialize
      @client = T.let(@client, T.nilable(ICloud::Client))
      ICloudCredentials.first.try! do |credentials|
        credentials = T.let(credentials, ICloudCredentials)
        authenticate(credentials: credentials)
      end
    end

    # == Methods ==
    sig { params(credentials: ICloudCredentials).void }
    def authenticate(credentials:)
      @client = Client.new(credentials: credentials)
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

    # == Helpers ==
    sig { returns(Client) }
    def client
      @client or raise "iCloud client is not initialized"
    end

    sig { returns(Client) }
    def authenticated_client
      raise "iCloud client is not authenticated" unless authenticated?
      client
    end
  end

  ActiveSupport.run_load_hooks(:icloud, self)
end
