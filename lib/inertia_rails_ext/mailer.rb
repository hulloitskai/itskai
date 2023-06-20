# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Mailer
    extend T::Sig
    extend T::Helpers
    extend ActiveSupport::Concern

    # == Annotations
    requires_ancestor { ActionMailer::Base }

    # == Configuration
    prepended do
      T.bind(self, T.class_of(ActionMailer::Base))

      helper Helper
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
      super(headers, &block)
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
      raise "Inertia SSR must be enabled" unless InertiaRails.ssr_enabled?
      wait_for_inertia_ssr_ready
      request = ActionDispatch::Request.new({ "ORIGINAL_FULLPATH" => "/" })
      response = ActionDispatch::Response.new
      renderer = InertiaRails::Renderer.new(
        component,
        self,
        request,
        response,
        method(:render),
        props:,
        view_data: nil,
      )
      renderer.render
    end

    sig { void }
    def wait_for_inertia_ssr_ready
      attempts = 0
      begin
        attempts += 1
        HTTParty.head(InertiaRails.ssr_url)
      rescue Errno::ECONNREFUSED
        sleep(1)
        if attempts < 3
          retry
        else
          raise "Inertia SSR server cannot be reached"
        end
      end
    end

    sig { returns(String) }
    def inertia_layout = "mailer"
  end
end
