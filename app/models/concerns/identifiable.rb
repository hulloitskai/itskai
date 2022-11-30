# typed: strict
# frozen_string_literal: true

module Identifiable
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  # == Attributes
  sig { returns(String) }
  def id!
    self.id ||= SecureRandom.uuid
  end
end
