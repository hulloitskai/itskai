# typed: true
# frozen_string_literal: true

module Dishwatcher
  class DevicePolicy < ApplicationPolicy
    # == Rules
    def show? = false
  end
end
