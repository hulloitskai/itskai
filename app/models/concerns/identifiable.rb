# typed: true
# frozen_string_literal: true

module Identifiable
  extend T::Sig
  extend T::Helpers

  # == Modules
  extend ActiveSupport::Concern

  # == Configuration
  requires_ancestor { ApplicationRecord }

  # == Attributes
  sig { returns(String) }
  def id!
    self.id ||= SecureRandom.uuid
  end
end
