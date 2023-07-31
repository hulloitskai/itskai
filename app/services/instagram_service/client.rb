# typed: true
# frozen_string_literal: true

class InstagramService
  class Client
    extend T::Sig
    include Logging

    # == Initialization
    sig do
      params(credentials: InstagramCredentials,
             security_code: T.nilable(String)).void
    end
    def initialize(credentials:, security_code: nil)
      super()
      @credentials = credentials
      restore_credentials
      @pyclient = build_pyclient(security_code:)
      save_credentials
    end

    # == Methods
    sig { params(content: String, audience: Symbol).returns(T.untyped) }
    def create_note(content, audience: :close_friends)
      if content.length > 50
        raise ArgumentError, "`content' must be 50 characters or less"
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

    # == Helpers
    sig { params(security_code: T.nilable(String)).returns(T.untyped) }
    def build_pyclient(security_code: nil)
      klass = PyCall.import_module("instagram").Client
      klass.new(
        username: @credentials.username,
        password: @credentials.password,
        credentials_dir: InstagramService.credentials_dir.to_s,
        security_code:,
      )
    end

    sig { returns(Pathname) }
    def credentials_dir = InstagramService.credentials_dir

    sig { void }
    def save_credentials
      if File.exist?(session_filename)
        session = File.read(session_filename)
        @credentials.update!(session: JSON.parse(session))
      else
        tag_logger do
          logger.warn("Missing session after initializing Instagram client")
        end
      end
    end

    sig { void }
    def restore_credentials
      FileUtils.mkdir_p(credentials_dir)
      session = @credentials.session
      if session.present?
        File.write(session_filename, session.to_json)
      else
        FileUtils.rm_rf(Dir.glob("#{credentials_dir}/*"))
      end
    end

    sig { returns(String) }
    def session_filename
      @session_filename = T.let(@session_filename, T.nilable(String))
      @session_filename ||= File.join(credentials_dir, "session.json")
    end
  end
end
