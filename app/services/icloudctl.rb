# typed: strict
# frozen_string_literal: true

require "icloud"

class ICloudctl < ApplicationService
  include Singleton

  # == Initialization
  sig { void }
  def initialize
    super
    @conn = T.let(
      Faraday.new(url: "http://localhost:3001") do |f|
        f.request(:json)
        f.response(:json)
      end,
      Faraday::Connection,
    )
    maybe_login_from_saved_credentials
  end

  # == Attributes
  sig { returns(Faraday::Connection) }
  attr_reader :conn

  # == Methods
  sig { returns(Symbol) }
  def self.status
    payload = instance.perform_request { |conn| conn.get("/") }
    payload.fetch("status").to_sym
  end

  sig do
    params(email: String, password: String).returns(LoginResult)
  end
  def self.login(email:, password:)
    ICloudCredentials.destroy_all
    instance.remove_session_files
    instance.perform_login(email:, password:).tap do |result|
      result = T.let(result, LoginResult)
      credentials = ICloudCredentials.new(email:, password:)
      instance.preserve_session_files(credentials) unless result.requires_2fa
      credentials.save!
    end
  end

  sig { params(code: String).returns(VerifySecurityCodeResult) }
  def self.verify_security_code(code)
    credentials = ICloudCredentials.first or raise "Missing saved credentials"
    payload = instance.perform_request do |conn|
      conn.post("/verify_security_code", { "code" => code })
    end
    instance.preserve_session_files(credentials)
    credentials.save!
    VerifySecurityCodeResult.from_hash!(payload)
  end

  sig { returns(LogoutResult) }
  def self.logout
    ICloudCredentials.destroy_all
    instance.remove_session_files
    payload = instance.perform_request { |conn| conn.post("/logout") }
    LogoutResult.from_hash!(payload)
  end

  sig { returns(T.nilable(Device)) }
  def self.iphone
    device_id = ICloud.iphone_device_id or return
    payload = instance.perform_request do |conn|
      uri = Addressable::URI.parse("/device")
      uri.query_values = { "id" => device_id }
      conn.get(uri.to_s)
    end
    Device.from_hash(payload.fetch("device"))
  end

  # == Helpers
  sig { params(email: String, password: String).returns(LoginResult) }
  def perform_login(email:, password:)
    payload = perform_request(error_class: LoginError) do |conn|
      conn.post("/login", {
        "email" => email,
        "password" => password,
        "credentials_dir" => ICloud::CREDENTIALS_DIR,
      })
    end
    LoginResult.from_hash!(payload)
  end

  sig { params(credentials: ICloudCredentials).void }
  def preserve_session_files(credentials)
    credentials.cookies = File.read(cookies_filename(credentials))
    credentials.session = JSON.parse(File.read(session_filename(credentials)))
  end

  sig { params(credentials: ICloudCredentials).returns(T::Boolean) }
  def restore_session_files(credentials)
    FileUtils.mkdir_p(ICloud::CREDENTIALS_DIR)
    cookies, session = credentials.cookies, credentials.session
    if cookies.present? && session.present?
      File.write(cookies_filename(credentials), cookies)
      File.write(session_filename(credentials), session.to_json)
      true
    else
      remove_session_files
      false
    end
  end

  sig { void }
  def remove_session_files
    FileUtils.rm_rf(Dir.glob("#{ICloud::CREDENTIALS_DIR}/*"))
  end

  sig do
    params(
      response: Faraday::Response,
      error_class: T.nilable(T.class_of(Exception)),
    ).void
  end
  def raise_response_error(
    response,
    error_class: nil
  )
    return if response.success?
    error = response.body["error"] or return
    error_class = ServiceError if error_class.nil?
    raise error_class, error
  end

  sig do
    params(
      error_class: T.nilable(T.class_of(Exception)),
      block: T.proc
        .params(conn: Faraday::Connection)
        .returns(Faraday::Response),
    ).returns(T::Hash[String, T.untyped])
  end
  def perform_request(error_class: nil, &block)
    response = yield(conn)
    raise_response_error(response, error_class:)
    response.body.fetch("data")
  end

  private

  # == Helpers
  sig { params(credentials: ICloudCredentials).returns(String) }
  def cookies_filename(credentials)
    File.join(
      ICloud::CREDENTIALS_DIR,
      credentials.email.gsub(/[^0-9a-z]/i, ""),
    )
  end

  sig { params(credentials: ICloudCredentials).returns(String) }
  def session_filename(credentials)
    "#{cookies_filename(credentials)}.session"
  end

  sig { returns(T.nilable(LoginResult)) }
  def maybe_login_from_saved_credentials
    credentials = ICloudCredentials.first or return
    restore_session_files(credentials) or return
    credentials => { email:, password: }
    suppress(LoginError) do
      perform_login(email:, password:).tap do
        preserve_session_files(credentials)
        credentials.save!
      end
    end
  end
end
