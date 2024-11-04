# typed: true
# frozen_string_literal: true

class UnauthenticatedError < StandardError
  extend T::Sig

  sig { override.returns(String) }
  def message
    "Authentication required"
  end
end
