# typed: true
# frozen_string_literal: true

class StatusPolicy < ApplicationPolicy
  def index?
    !!friend
  end
end
