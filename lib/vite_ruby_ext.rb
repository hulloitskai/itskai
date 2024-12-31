# typed: true
# frozen_string_literal: true

require "vite_ruby"

class ViteRuby
  extend T::Sig

  # == Attributes
  class_attribute :dev_server_disabled, default: false
  class_attribute :auto_build_disabled, default: false

  # == Methods
  sig do
    type_parameters(:U).params(
      block: T.proc.returns(T.type_parameter(:U)),
    ).returns(T.type_parameter(:U))
  end
  def self.without_dev_server(&block)
    prev_disabled = dev_server_disabled
    self.dev_server_disabled = true
    begin
      yield
    ensure
      self.dev_server_disabled = prev_disabled
    end
  end

  sig do
    type_parameters(:U).params(
      block: T.proc.returns(T.type_parameter(:U)),
    ).returns(T.type_parameter(:U))
  end
  def self.without_auto_build(&block)
    prev_disabled = auto_build_disabled
    self.auto_build_disabled = true
    begin
      yield
    ensure
      self.auto_build_disabled = prev_disabled
    end
  end

  # Allows disabling the dev server.
  module DisableDevServerSupport
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ViteRuby }

    sig { returns(T::Boolean) }
    def dev_server_running?
      !dev_server_disabled? && super
    end
  end
  prepend DisableDevServerSupport

  class DevServerProxy
    # Allows disabling the dev server.
    module DisableDevServerSupport
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
        !ViteRuby.dev_server_disabled? && super
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
    prepend DisableDevServerSupport
  end

  class Manifest
    # Allows disabling auto build.
    module DisableAutoBuildSupport
      extend T::Sig
      extend T::Helpers

      requires_ancestor { Manifest }

      private

      sig { returns(T::Boolean) }
      def should_build?
        !ViteRuby.auto_build_disabled? && super
      end
    end
    prepend DisableAutoBuildSupport
  end
end
