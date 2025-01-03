# typed: true
# frozen_string_literal: true

require "inertia_rails"
require_relative "asset_helper"
require_relative "mailer/renderer"

module InertiaRails
  module Mailer
    extend T::Sig
    extend T::Helpers
    extend ActiveSupport::Concern

    requires_ancestor { ActionMailer::Base }

    prepended do
      T.bind(self, T.class_of(ActionMailer::Base))

      helper_method :inertia_headers
      helper AssetHelper
      before_action :prepare_instance_variables
    end

    # == Methods
    sig do
      params(
        headers: T::Hash[Symbol, T.untyped],
        block: T.nilable(T.proc.void),
      ).returns(Mail::Message)
    end
    def mail(headers = {}, &block)
      if headers.include?(:inertia)
        headers[:body] = inertia_render(
          headers[:inertia],
          **headers.slice(:props),
        )
        headers[:content_type] = "text/html"
      end
      super
    end

    # == Helpers
    def inertia_headers
      @_inertia_html_headers.join.html_safe # rubocop:disable Rails/OutputSafety
    end

    def inertia_headers=(value)
      @_inertia_html_headers = value
    end

    private

    # == Helpers
    sig do
      params(
        component: String,
        props: T::Hash[T.any(Symbol, String), T.untyped],
      ).returns(T.untyped)
    end
    def inertia_render(component, props: {})
      wait_for_inertia_ssr_ready
      request = ActionDispatch::Request.new({ "ORIGINAL_FULLPATH" => "/" })
      renderer = Renderer.new(
        component,
        self,
        request,
        nil,
        method(:render),
        props:,
        view_data: nil,
      )
      ViteRuby.without_dev_server do
        ViteRuby.without_auto_build do
          renderer.render
        end
      end
    rescue => error
      raise "Failed to render email with Inertia: #{error}"
    end

    sig { void }
    def wait_for_inertia_ssr_ready
      attempts = 0
      begin
        attempts += 1
        Faraday.head(InertiaRails.ssr_url)
      rescue Errno::ECONNREFUSED
        sleep(0.5)
        if attempts < 6
          retry
        else
          raise "Inertia SSR server cannot be reached"
        end
      end
    end

    sig { returns(String) }
    def inertia_layout = "mailer"

    sig { void }
    def prepare_instance_variables
      @_inertia_html_headers ||= []
    end
  end
end
