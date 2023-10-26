# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  config.after_initialize do
    ActionMailer::Base.register_interceptor(LowercasingInterceptor)
    if ActionMailer::Base.respond_to?(:register_preview_interceptor)
      ActionMailer::Base.register_preview_interceptor(LowercasingInterceptor)
    end
  end
end
