# typed: strict
# frozen_string_literal: true

require "pycall_ext"

module ICloud
  class Client
    extend T::Sig

    PyClient = T.let(PyCall.import_module("icloud").ICloud, T.untyped)

    sig { params(credentials: ICloudCredentials).void }
    def initialize(credentials:)
      @credentials = credentials
      restore_credentials
      @pyicloud = T.let(@pyicloud, T.untyped)
      @pyicloud =
        PyClient.new(
          email: @credentials.email,
          password: @credentials.password,
          cookie_directory: ICloud.credentials_dir,
        )
      save_credentials
    end

    sig { params(code: T.nilable(String)).returns(T::Boolean) }
    def verify_security_code(code)
      @pyicloud.verify_security_code(code).tap { save_credentials }
    end

    sig { returns(T::Boolean) }
    def requires_security_code?
      @pyicloud.requires_security_code
    end

    sig { returns(Drive) }
    def drive
      Drive.new(@pyicloud.drive)
    end

    private

    sig { returns(T.nilable(ICloudCredentials)) }
    attr_reader :credentials

    sig { returns(ICloudCredentials) }
    def credentials!
      T.must(credentials)
    end

    sig { void }
    def save_credentials
      credentials = self.credentials or return
      cookies = File.read(cookies_filename!)
      session = File.read(session_filename!)
      credentials.update!(cookies: cookies, session: JSON.parse(session))
    end

    sig { void }
    def restore_credentials
      FileUtils.mkdir_p(ICloud.credentials_dir)
      credentials = self.credentials or return
      cookies, session = credentials.cookies, credentials.session
      if [cookies, session].all?(&:present?)
        cookies = T.must(cookies)
        session = credentials.session
        File.write(cookies_filename!, cookies)
        File.write(session_filename!, session.to_json)
      else
        FileUtils.remove_dir(ICloud.credentials_dir)
      end
    end

    sig { returns(String) }
    def cookies_filename!
      File.join(
        ICloud.credentials_dir,
        credentials!.email.gsub(/[^0-9a-z]/i, ""),
      )
    end

    sig { returns(String) }
    def session_filename!
      cookies_filename! + ".session"
    end
  end
end
