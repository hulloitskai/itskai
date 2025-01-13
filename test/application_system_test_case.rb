# typed: strict
# frozen_string_literal: true

require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  extend T::Sig
  include Devise::Test::IntegrationHelpers

  # == Configuration
  driven_by :playwright

  # == Setup
  sig { void }
  def setup
    wait_for_inertia_ssr
    super
  end

  private

  # == Helpers
  sig { returns(T::Boolean) }
  def inertia_ssr_running?
    url = Addressable::URI.parse(InertiaRails.configuration.ssr_url)
    Socket.tcp(url.hostname, url.port, connect_timeout: 0.5) do
      true
    end rescue false
  end

  sig { returns(NilClass) }
  def wait_for_inertia_ssr
    until inertia_ssr_running?
      puts "Waiting for Inertia SSR to start..."
      sleep(0.5)
    end
  end
end
