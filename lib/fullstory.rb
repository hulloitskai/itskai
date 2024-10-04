# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Fullstory
  extend T::Sig

  sig { returns(T.nilable(String)) }
  def self.org_id
    credentials.org_id
  end

  # == Helpers
  def self.credentials
    Rails.application.credentials.fullstory!
  end
end
