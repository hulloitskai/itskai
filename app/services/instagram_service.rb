# typed: true
# frozen_string_literal: true

class InstagramService < ApplicationService
  class << self
    # == Lifecycle
    # def disabled?
    #   return !!@disabled if defined?(@disabled)
    #   @disabled = T.let(@disabled, T.nilable(T::Boolean))
    #   @disabled = iphone_device_id.nil? || super
    # end

    # == Settings
    sig { returns(Pathname) }
    def credentials_dir
      @credentials_dir = T.let(@credentials_dir, T.nilable(Pathname))
      @credentials_dir ||= Rails.root.join("tmp/#{service_name}")
    end

    # == Methods
    sig do
      params(
        credentials: InstagramCredentials,
        security_code: T.nilable(String),
      ).returns(Client)
    end
    def authenticate(credentials, security_code: nil)
      instance.authenticate(credentials, security_code:)
    end

    sig { returns(Client) }
    def client
      checked { instance.client }
    end

    sig do
      params(content: String, audience: Symbol).returns(T.untyped)
    end
    def create_note(content, audience: :close_friends)
      checked { instance.create_note(content, audience:) }
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @credentials = T.let(@credentials, T.nilable(InstagramCredentials))
    @client = T.let(@client, T.nilable(Client))
  end

  # == Lifecycle
  sig { override.returns(T::Boolean) }
  def ready?
    @client.present? && super
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

  # == Methods
  sig do
    params(credentials: InstagramCredentials, security_code: T.nilable(String))
      .returns(Client)
  end
  def authenticate(credentials, security_code: nil)
    @client = Client.new(credentials:, security_code:)
  end

  sig { returns(Client) }
  def client
    @client or raise "Missing client"
  end

  sig { params(content: String, audience: Symbol).returns(T.untyped) }
  def create_note(content, audience: :close_friends)
    client.create_note(content, audience:)
  end

  private

  # == Helpers
  sig { returns(T.nilable(InstagramCredentials)) }
  def saved_credentials
    InstagramCredentials.where.not(session: nil).first
  end

  sig { returns(Client) }
  def authenticated_client
    # if client.requires_security_code?
    #   raise "Not authenticated (requires security code)"
    # end
    client
  end
end
