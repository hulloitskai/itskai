# typed: true
# frozen_string_literal: true

require "vite_ruby"

class ViteRuby
  extend T::Sig

  # == Attributes
  class_attribute :dev_server_enabled, default: true

  # == Methods
  sig do
    type_parameters(:U).params(
      block: T.proc.returns(T.type_parameter(:U)),
    ).returns(T.type_parameter(:U))
  end
  def self.without_dev_server(&block)
    prev_enabled = dev_server_enabled
    self.dev_server_enabled = false
    begin
      yield
    ensure
      self.dev_server_enabled = prev_enabled
    end
  end

  # Enable ViteRuby.without_dev_server { ... }.
  module WithoutDevServerSupport
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ViteRuby }

    sig { returns(T::Boolean) }
    def dev_server_running?
      dev_server_enabled? && super
    end
  end
  prepend WithoutDevServerSupport

  class DevServerProxy
    # Enable ViteRuby.without_dev_server { ... }.
    module WithoutDevServerSupport
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
        ViteRuby.dev_server_enabled? && super
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
    prepend WithoutDevServerSupport
  end
end
