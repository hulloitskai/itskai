# typed: strict
# frozen_string_literal: true

class ICloudClient
  extend T::Sig
  include Logging

  # == Current
  sig { returns(T.nilable(T.attached_class)) }
  def self.current
    if (credentials = ICloudCredentials.first)
      from_credentials(credentials)
    end
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

  sig { returns(ICloudDrive) }
  def drive
    ICloudDrive.new(@pyclient.drive)
  end

  sig { returns(T::Array[ICloudDevice]) }
  def devices
    devices_by_id.values
  end

  sig { params(id: String).returns(ICloudDevice) }
  def device(id)
    devices_by_id[id] or raise "Device not found"
  end

  sig { returns(T.nilable(ICloudDevice)) }
  def iphone
    device_id = ICloud.iphone_device_id or return
    devices_by_id[device_id]
  end

  sig { returns(ICloudDevice) }
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
    cookies = File.read(cookies_filename)
    session = File.read(session_filename)
    @credentials.update!(cookies: cookies, session: JSON.parse(session))
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
    @cookies_filename = T.let(@cookies_filename, T.nilable(String))
    @cookies_filename ||= File.join(
      ICloud::CREDENTIALS_DIR,
      @credentials.email.gsub(/[^0-9a-z]/i, ""),
    )
  end

  sig { returns(String) }
  def session_filename
    @session_filename = T.let(@session_filename, T.nilable(String))
    @session_filename ||= cookies_filename + ".session"
  end

  sig { returns(T::Hash[String, ICloudDevice]) }
  def devices_by_id
    @pyclient.devices.to_h.transform_values { |value| ICloudDevice.new(value) }
  end
end
