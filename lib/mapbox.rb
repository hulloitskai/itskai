# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Mapbox
  extend T::Sig

  sig { returns(T.nilable(String)) }
  def self.access_token
    credentials.client_id
  end

  # == Helpers
  sig { returns(T.untyped) }
  def self.credentials
    Rails.application.credentials.mapbox!
  end
end
