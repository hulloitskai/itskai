# typed: strict
# frozen_string_literal: true

class ICloud < ApplicationService
  # == Configuration
  config_accessor :credentials_dir, default: Rails.root.join("tmp/icloud")

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(@client, T.nilable(Client))
    ICloudCredentials.first.try! do |credentials|
      credentials = T.let(credentials, ICloudCredentials)
      authenticate!(credentials)
    end
  end

  # == Service
  sig { override.returns(T::Boolean) }
  def ready?
    super or return false
    client = self.client or return false
    !client.requires_security_code?
  end

  sig { params(credentials: ICloudCredentials).void }
  def authenticate!(credentials)
    self.client = Client.new(credentials:)
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

  sig { returns(Drive) }
  def drive = authenticated_client!.drive

  # == Methods
  sig { params(code: T.nilable(String)).returns(T::Boolean) }
  def verify_security_code(code)
    client!.verify_security_code(code).tap do
      ObsidianNote.synchronize_all_later
    end
  end

  private

  # == Helpers
  sig { returns(T.nilable(Client)) }
  attr_accessor :client

  sig { returns(Client) }
  def client!
    client or raise "Not authenticated"
  end

  sig { returns(Client) }
  def authenticated_client!
    client = client!
    if client.requires_security_code?
      raise "Not authenticated: requires security code"
    end
    client
  end
end

class ICloud
  class << self
    # == Service
    sig { params(credentials: ICloudCredentials).void }
    def authenticate!(credentials) = instance.authenticate!(credentials)

    sig { returns(ICloud::Drive) }
    def drive = instance.drive

    # == Methods
    sig { params(code: T.nilable(String)).returns(T::Boolean) }
    def verify_security_code(code) = instance.verify_security_code(code)
  end
end
