# typed: strict
# frozen_string_literal: true

Rails.application.configure do
  ENV
    .fetch("RAILS_SECRET_KEY_BASE", nil)
    .try { |value| config.secret_key_base = value }
end
