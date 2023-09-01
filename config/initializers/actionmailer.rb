# typed: true
# frozen_string_literal: true

Rails.application.configure do
  config.action_mailer.interceptors =
    :subject_and_sender_lowercasing_interceptor

  if Rails.env.development?
    config.action_mailer.preview_interceptors =
      :subject_and_sender_lowercasing_interceptor
  end
end
