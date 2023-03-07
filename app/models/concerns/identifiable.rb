# typed: true
# frozen_string_literal: true

module Identifiable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { ApplicationRecord }

  # == Attributes
  sig { returns(String) }
  def id!
    self.id ||= SecureRandom.uuid
  end
end
