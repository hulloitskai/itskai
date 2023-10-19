# typed: strict
# frozen_string_literal: true

require "icloud"

class ICloudClient < ApplicationService
  # == Current
  sig { returns(T.nilable(T.attached_class)) }
  def self.current
    if (credentials = ICloudCredentials.first)
      from_credentials(credentials)
    end
  end

  sig { returns(T.attached_class) }
  def self.current!
    current or raise "Missing iCloud credentials"
  end

  # == Builders
  sig { params(credentials: ICloudCredentials).returns(T.attached_class) }
  def self.from_credentials(credentials)
    @clients = T.let(
      @clients,
      T.nilable(T::Hash[ICloudCredentials, ICloudClient]),
    )
    @clients ||= Hash.new do |hash, credentials|
      hash[credentials] = new(credentials:)
    end
    @clients[credentials]
  end

  # == Methods
  sig { params(code: T.nilable(String)).returns(T::Boolean) }
  def verify_security_code(code)
    @pyclient.verify_security_code(code).tap { save_credentials }
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

  sig { returns(T.nilable(Device)) }
  def iphone
    device_id = ICloud.iphone_device_id or return
    devices_by_id[device_id]
  end

  sig { returns(Device) }
  def iphone!
    devices_by_id.fetch(ICloud.iphone_device_id!)
  end

  private

  # == Initialization
  sig { params(credentials: ICloudCredentials).void }
  def initialize(credentials:)
    super()
    @credentials = credentials
    restore_credentials
    @pyclient = T.let(build_pyclient, T.untyped)
    save_credentials
  end

  # == Helpers
  sig { returns(T.untyped) }
  def build_pyclient
    klass = PyCall.import_module("icloud").Client
    klass.new(
      email: @credentials.email,
      password: @credentials.password,
      credentials_dir: ICloud::CREDENTIALS_DIR.to_s,
    )
  end

  sig { void }
  def save_credentials
    @credentials.cookies = File.read(cookies_filename)
    @credentials.session = JSON.parse(File.read(session_filename))
    @credentials.save!(context: :initialize_client)
  end

  sig { void }
  def restore_credentials
    FileUtils.mkdir_p(ICloud::CREDENTIALS_DIR)
    cookies, session = @credentials.cookies, @credentials.session
    if cookies.present? && session.present?
      File.write(cookies_filename, cookies)
      File.write(session_filename, session.to_json)
    else
      FileUtils.rm_rf(Dir.glob("#{ICloud::CREDENTIALS_DIR}/*"))
    end
  end

  sig { returns(String) }
  def cookies_filename
    @cookies_filename ||= T.let(
      File.join(
        ICloud::CREDENTIALS_DIR,
        @credentials.email.gsub(/[^0-9a-z]/i, ""),
      ),
      T.nilable(String),
    )
  end

  sig { returns(String) }
  def session_filename
    @session_filename ||= T.let(
      cookies_filename + ".session",
      T.nilable(String),
    )
  end

  sig { returns(T::Hash[String, Device]) }
  def devices_by_id
    @pyclient.devices.to_h.transform_values do |value|
      Device.new(value)
    end
  end
end
