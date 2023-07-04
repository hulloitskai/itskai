# typed: true
# frozen_string_literal: true

class ViteRuby
  class DevServerProxy
    module Extension
      extend T::Sig
      extend T::Helpers

      # == Annotations
      requires_ancestor { DevServerProxy }

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

    include Extension
  end
end
