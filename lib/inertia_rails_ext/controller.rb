# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Controller
    # == Included
    remove_instance_variable :@_included_block
    included do
      T.bind(self, T.class_of(ActionController::Base))

      before_action :share_inertia_errors
      helper Helper
    end

    module Patch
      extend T::Sig
      extend T::Helpers

      requires_ancestor { ActionController::Base }

      private

      # == Callbacks
      sig { void }
      def share_inertia_errors
        if (errors = session[:inertia_errors].presence)
          InertiaRails.share(errors:)
        end
      end

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
    prepend Patch
  end
end
