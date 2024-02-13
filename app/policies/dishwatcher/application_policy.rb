# typed: true
# frozen_string_literal: true

module Dishwatcher
  class ApplicationPolicy < ::ApplicationPolicy
    # == Context
    authorize :device_secret_key, optional: true
  end
end
