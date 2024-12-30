# typed: true
# frozen_string_literal: true

require "vite_ruby"

class ViteRuby
  extend T::Sig

  # == Attributes
  class_attribute :email_rendering_mode, default: false

  # == Methods
  sig do
    type_parameters(:U).params(
      block: T.proc.returns(T.type_parameter(:U)),
    ).returns(T.type_parameter(:U))
  end
  def self.configure_for_email_rendering(&block)
    self.email_rendering_mode = true
    begin
      yield
    ensure
      self.email_rendering_mode = false
    end
  end

  # Enable ViteRuby.configure_for_email_rendering { ... }.
  module EmailRenderingSupport
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ViteRuby }

    sig { returns(T::Boolean) }
    def dev_server_running?
      !email_rendering_mode? && super
    end
  end
  prepend EmailRenderingSupport

  class DevServerProxy
    # Enable ViteRuby.configure_for_email_rendering { ... }.
    module EmailRenderingSupport
      extend T::Sig
      extend T::Helpers

      requires_ancestor { DevServerProxy }

      # == Initializer
      def initialize(...)
        super
        @app = T.let(@app, T.untyped)
      end

      # == Methods
      sig { returns(T::Boolean) }
      def dev_server_running?
        !ViteRuby.email_rendering_mode? && super
      end

      sig { params(env: T::Hash[String, T.untyped]).returns(T.untyped) }
      def perform_request(env)
        if vite_should_handle?(env) && dev_server_running?
          forward_to_vite_dev_server(env)
          response = super
          if response.first == Rack::Utils::SYMBOL_TO_STATUS_CODE[:not_found]
            @app.call(env)
          else
            response
          end
        else
          @app.call(env)
        end
      end
    end
    prepend EmailRenderingSupport
  end

  class Manifest
    module EmailRenderingSupport
      extend T::Sig
      extend T::Helpers

      requires_ancestor { Manifest }

      private

      sig { returns(T::Boolean) }
      def should_build?
        !ViteRuby.email_rendering_mode? && super
      end
    end
    prepend EmailRenderingSupport
  end
end
