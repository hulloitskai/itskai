# typed: strict
# frozen_string_literal: true

require "logging"
require "instagram"

class InstagramClient < ApplicationService
  # == Current
  sig { returns(T.nilable(InstagramClient)) }
  def self.current
    if (credentials = InstagramCredentials.where.not(session: nil).first)
      from_credentials(credentials)
    end
  end

  sig { returns(InstagramClient) }
  def self.current!
    current or raise "Missing Instagram credentials"
  end

  # == Builders
  sig do
    params(
      credentials: InstagramCredentials,
      security_code: T.nilable(String),
    ).returns(T.attached_class)
  end
  def self.from_credentials(credentials, security_code: nil)
    @clients = T.let(
      @clients,
      T.nilable(T::Hash[InstagramCredentials, InstagramClient]),
    )
    @clients ||= Hash.new do |hash, credentials|
      hash[credentials] = new(credentials:, security_code:)
    end
    @clients.clear if security_code.present?
    @clients[credentials]
  end

  # == Methods
  sig { params(content: String, audience: Symbol).returns(T.untyped) }
  def create_note(content, audience: :close_friends)
    if content.length > 50
      raise ArgumentError, "Must be 50 characters or less"
    end
    audience_code = case audience
    when :everyone
      0
    when :close_friends
      1
    else
      raise ArgumentError,
            "Invalid audience (expected :everyone or :close_friends)"
    end
    @pyclient.send_note(content, audience_code)
  end

  private

  # == Initialization
  sig do
    params(
      credentials: InstagramCredentials,
      security_code: T.nilable(String),
    ).void
  end
  def initialize(credentials:, security_code: nil)
    super()
    @credentials = credentials
    restore_credentials
    @pyclient = T.let(build_pyclient(security_code:), T.untyped)
    save_credentials
  end

  # == Helpers
  sig { params(security_code: T.nilable(String)).returns(T.untyped) }
  def build_pyclient(security_code: nil)
    klass = PyCall.import_module("instagram").Client
    klass.new(
      username: @credentials.username,
      password: @credentials.password,
      credentials_dir: Instagram::CREDENTIALS_DIR.to_s,
      security_code:,
    )
  end

  sig { void }
  def save_credentials
    if File.exist?(session_filename)
      @credentials.session = JSON.parse(File.read(session_filename))
      @credentials.save!(context: :initialize_client)
    else
      tag_logger do
        logger.warn("Missing session after initializing Instagram client")
      end
    end
  end

  sig { void }
  def restore_credentials
    FileUtils.mkdir_p(Instagram::CREDENTIALS_DIR)
    session = @credentials.session
    if session.present?
      File.write(session_filename, session.to_json)
    else
      FileUtils.rm_rf(Dir.glob("#{Instagram::CREDENTIALS_DIR}/*"))
    end
  end

  sig { returns(String) }
  def session_filename
    @session_filename ||= T.let(
      File.join(Instagram::CREDENTIALS_DIR, "session.json"),
      T.nilable(String),
    )
  end
end
