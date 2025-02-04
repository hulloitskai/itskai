# typed: true
# frozen_string_literal: true

require "core_ext"
require "inertia_rails"
require_relative "asset_helper"

module InertiaRails
  module Mailer
    class Renderer < ::InertiaRails::Renderer
      def render = render_ssr
    end

    extend ActiveSupport::Concern
    extend T::Sig
    extend T::Helpers
    public_send(:include, scoped do # rubocop:disable Style/SendWithLiteralMethodName
      controller = InertiaRails::Controller.clone
      controller.remove_instance_variable(:@_included_block)
      controller
    end)

    requires_ancestor { ActionMailer::Base }

    prepended do
      T.bind(self, T.class_of(ActionMailer::Base))

      helper Helper
      helper AssetHelper
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
        headers[:body] =
          inertia_render(headers[:inertia], **headers.slice(:props))
        headers[:content_type] = "text/html"
      end
      super
    end

    # == Inertia helpers
    def session = {}

    private

    # == Rendering helpers
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
        Faraday.head(InertiaRails.configuration.ssr_url)
      rescue Errno::ECONNREFUSED
        sleep(0.5)
        if attempts < 6
          retry
        else
          raise "Inertia SSR server cannot be reached"
        end
      end
    end
  end
end
