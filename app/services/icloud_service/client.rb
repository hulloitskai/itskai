# typed: true
# frozen_string_literal: true

class ICloudService
  class Client
    extend T::Sig
    include Logging

    # == Constants
    PyICloud = PyCall.import_module("client").Client

    # == Initialization
    sig { params(credentials: ICloudCredentials).void }
    def initialize(credentials:)
      super()
      @credentials = credentials
      if Rails.console?
        Rails.logger.silence { restore_credentials! }
      else
        restore_credentials!
      end
      @pyicloud = T.let(
        PyICloud.new(
          email: @credentials.email,
          password: @credentials.password,
          cookie_directory: ICloudService.credentials_dir.to_s,
        ),
        T.untyped,
      )
      if Rails.console?
        Rails.logger.silence { save_credentials! }
      else
        save_credentials!
      end
    end

    # == Methods
    sig { params(code: T.nilable(String)).returns(T::Boolean) }
    def verify_security_code(code)
      @pyicloud.verify_security_code(code).tap { save_credentials! }
    end

    sig { returns(T::Boolean) }
    def requires_security_code?
      @pyicloud.requires_security_code
    end

    sig { returns(Drive) }
    def drive
      Drive.new(@pyicloud.drive)
    end

    sig { returns(T::Array[T.untyped]) }
    def devices
      @pyicloud.devices
    end

    private

    # == Attributes
    sig { returns(T.nilable(ICloudCredentials)) }
    attr_reader :credentials

    # == Helpers
    sig { returns(ICloudCredentials) }
    def credentials!
      credentials or raise "Missing credentials"
    end

    sig { void }
    def save_credentials!
      credentials = self.credentials or return
      cookies = File.read(cookies_filename!)
      session = File.read(session_filename!)
      credentials.update!(cookies: cookies, session: JSON.parse(session))
    end

    sig { void }
    def restore_credentials!
      FileUtils.mkdir_p(ICloudService.credentials_dir)
      credentials = self.credentials or return
      cookies, session = credentials.cookies, credentials.session
      if cookies.present? && session.present?
        File.write(cookies_filename!, cookies)
        File.write(session_filename!, session.to_json)
      else
        FileUtils.remove_dir(ICloudService.credentials_dir)
      end
    end

    sig { returns(String) }
    def cookies_filename!
      File.join(
        ICloudService.credentials_dir,
        credentials!.email.gsub(/[^0-9a-z]/i, ""),
      )
    end

    sig { returns(String) }
    def session_filename!
      cookies_filename! + ".session"
    end
  end
end
