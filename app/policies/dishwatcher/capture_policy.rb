# typed: true
# frozen_string_literal: true

module Dishwatcher
  class CapturePolicy < ApplicationPolicy
    # == Rules
    def show? = false

    def create?
      if (secret_key = device_secret_key)
        device = T.let(record, Device)
        secret_key == device.secret_key
      else
        false
      end
    end
  end
end
