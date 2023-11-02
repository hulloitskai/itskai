# typed: strict
# frozen_string_literal: true

require "vite_ruby"

class ViteRuby
  class_attribute :dev_server_enabled, default: true

  class << self
    extend T::Sig

    sig do
      type_parameters(:U).params(
        block: T.proc.returns(T.type_parameter(:U)),
      ).returns(T.type_parameter(:U))
    end
    def without_dev_server(&block)
      prev_enabled = dev_server_enabled
      self.dev_server_enabled = false
      result = yield
      self.dev_server_enabled = prev_enabled
      result
    end
  end

  # Allow ViteRuby.without_dev_server { ... }.
  module Patch
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { ViteRuby }

    sig { returns(T::Boolean) }
    def dev_server_running?
      dev_server_enabled? && super
    end
  end
  prepend Patch

  class DevServerProxy
    # Allow ViteRuby.without_dev_server { ... }.
    module Patch
      extend T::Sig
      extend T::Helpers

      # == Annotations
      requires_ancestor { DevServerProxy }

      # == Initializer
      sig { params(args: T.untyped, kwargs: T.untyped).void }
      def initialize(*args, **kwargs)
        super
        @app = T.let(@app, T.untyped)
      end

      # == Methods
      sig { params(env: T::Hash[String, T.untyped]).returns(T.untyped) }
      def perform_request(env)
        if vite_should_handle?(env) && dev_server_running?
          forward_to_vite_dev_server(env)
          response = super(env)
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
    prepend Patch
  end
end
