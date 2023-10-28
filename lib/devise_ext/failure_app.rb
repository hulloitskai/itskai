# typed: strict
# frozen_string_literal: true

require "devise"
require "sorbet-runtime"

class Devise::FailureApp
  # Downcase first letter of the humanized attribute names when authentication
  # fails.
  module Patch
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { Devise::FailureApp }

    protected

    sig { params(default: T.nilable(T.any(String, Symbol))).returns(String) }
    def i18n_message(default = nil)
      message = warden_message || default || :unauthenticated
      if message.is_a?(Symbol)
        options = {}
        options[:resource_name] = scope
        options[:scope] = "devise.failure"
        options[:default] = [message]
        auth_keys = scope_class.authentication_keys
        keys =
          (auth_keys.respond_to?(:keys) ? auth_keys.keys : auth_keys)
            .map do |key|
              name = scope_class.human_attribute_name(key)
              name.downcase!
              name
            end
        options[:authentication_keys] =
          keys.join(I18n.t(:"support.array.words_connector"))
        options = i18n_options(options)
        I18n.t(:"#{scope}.#{message}", **options)
      else
        message.to_s
      end
    end
  end
  prepend Patch
end
