# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Clarity
  extend T::Sig

  sig { returns(T.nilable(String)) }
  def self.project_id
    credentials.project_id
  end

  sig { returns(String) }
  def self.project_id!
    credentials.project_id!
  end

  # == Helpers
  def self.credentials
    Rails.application.credentials.clarity!
  end
end
