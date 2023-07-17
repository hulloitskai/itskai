# typed: true
# frozen_string_literal: true

class ICloudService
  class Client
    extend T::Sig
    include Logging

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
      @pyclient = pyclient_class.new(
        email: @credentials.email,
        password: @credentials.password,
        cookie_directory: ICloudService.credentials_dir.to_s,
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
      @pyclient.verify_security_code(code).tap { save_credentials! }
    end

    sig { returns(T::Boolean) }
    def requires_security_code?
      @pyclient.requires_security_code
    end

    sig { returns(Drive) }
    def drive
      Drive.new(@pyclient.drive)
    end

    sig { returns(T::Array[Device]) }
    def devices
      devices_by_id.values
    end

    sig { params(id: String).returns(Device) }
    def device(id)
      devices_by_id[id] or raise "Device not found"
    end

    private

    # == Attributes
    sig { returns(T.nilable(ICloudCredentials)) }
    attr_reader :credentials

    # == Helpers
    sig { returns(Class) }
    def pyclient_class
      PyCall.import_module("client").Client
    end

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

    sig { returns(T::Hash[String, Device]) }
    def devices_by_id
      @pyclient.devices.to_h.transform_values { |value| Device.new(value) }
    end
  end
end
