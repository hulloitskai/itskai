# typed: true
# frozen_string_literal: true

require "sorbet-runtime"

module Fullstory
  extend T::Sig

  class Settings < T::Struct
    const :org_id, String
  end

  # == Methods
  sig { returns(T.nilable(Settings)) }
  def self.settings
    if (fullstory = Rails.application.credentials.fullstory)
      Settings.new(org_id: fullstory.org_id!)
    end
  end
end
