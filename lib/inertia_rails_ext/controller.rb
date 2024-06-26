# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Controller
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ActionController::Base }

    # == Included
    remove_instance_variable :@_included_block
    included do
      T.bind(self, T.class_of(ActionController::Base))

      before_action :prepare_instance_variables
      helper Helper
    end

    private

    # == Callbacks
    sig { void }
    def prepare_instance_variables
      error_sharing = proc do
        # :inertia_errors are deleted from the session by the middleware
        if @_request && session[:inertia_errors].present?
          { errors: session[:inertia_errors] }
        else
          {}
        end
      end
      @_inertia_shared_plain_data ||= {}
      @_inertia_shared_blocks ||= [error_sharing]
      @_inertia_html_headers ||= []
    end

    module FlattenInertiaErrors
      extend T::Sig
      extend T::Helpers

      requires_ancestor { ActionController::Base }

      private

      # == Helpers
      sig { params(options: T.untyped).void }
      def capture_inertia_errors(options)
        if (errors = options.dig(:inertia, :errors))
          session[:inertia_errors] = flatten_inertia_errors(errors)
        end
      end

      sig do
        params(nested_errors: T::Hash[String, T.untyped])
          .returns(T::Hash[String, String])
      end
      def flatten_inertia_errors(nested_errors)
        nested_errors.each_with_object({}) do |(key, value), hash|
          if value.is_a?(Hash)
            flatten_inertia_errors(value).map do |sub_key, sub_value|
              hash["#{key}.#{sub_key}"] = sub_value
            end
          else
            hash[key] = value
          end
        end
      end
    end
    include FlattenInertiaErrors
  end
end
