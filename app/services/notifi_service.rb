# typed: true
# frozen_string_literal: true

class NotifiService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = T.let(super, T::Boolean) && credentials.present?
    end

    # == Methods
    sig { returns(T.nilable(String)) }
    def credentials
      return @credentials if defined?(@credentials)
      @credentials = T.let(@credentials, T.nilable(String))
      @credentials = ENV["NOTIFI_CREDENTIALS"]
    end

    sig do
      params(
        title: String,
        message: T.nilable(String),
        link: T.nilable(String),
        image_url: T.nilable(String),
      ).void
    end
    def notify(title:, message: nil, link: nil, image_url: nil) =
      instance.notify(title:, message:, link:, image_url:)
  end

  # == Methods
  sig do
    params(
      title: String,
      message: T.nilable(String),
      link: T.nilable(String),
      image_url: T.nilable(String),
    ).void
  end
  def notify(title:, message: nil, link: nil, image_url: nil)
    response = HTTParty.post("https://notifi.it/api", body: {
      credentials:,
      title:,
      message:,
      link:,
      image: image_url,
    })
    unless response.code == 200
      message = "Failed to send notification"
      response.body.strip.presence.try! do |error|
        message += ": #{error}"
      end
      raise message
    end
  end

  private

  # == Helpers
  sig { returns(String) }
  def credentials
    T.must(self.class.credentials)
  end
end
