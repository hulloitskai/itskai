# typed: strict
# frozen_string_literal: true

require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  extend T::Sig
  extend T::Helpers
  include Devise::Test::IntegrationHelpers
  include Routing

  # == Configuration
  driven_by :headless_chrome
end
