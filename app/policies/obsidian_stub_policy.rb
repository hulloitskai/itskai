# typed: strict
# frozen_string_literal: true

class ObsidianStubPolicy < ApplicationPolicy
  sig { override.returns(T::Boolean) }
  def index?
    true
  end

  relation_scope { |relation| relation }
end
