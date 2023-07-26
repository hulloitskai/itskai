# typed: false
# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"

require_relative "../config/environment"
require "rails/test_help"

Webdrivers::Chromedriver.required_version = "114.0.5735.90"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize workers: :number_of_processors

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical
  # order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
