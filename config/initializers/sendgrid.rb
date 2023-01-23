# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.action_mailer.tap do |config|
    if config.delivery_method == :sendgrid
      config.delivery_method = :smtp
      config.smtp_settings = {
        address: "smtp.sendgrid.net",
        port: 465,
        tls: true,
        domain: ENV["SENDGRID_DOMAIN"],
        authentication: :plain,
        user_name: "apikey",
        password: ENV["SENDGRID_API_KEY"],
      }
    end
  end
end
