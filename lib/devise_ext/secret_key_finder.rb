# typed: strict
# frozen_string_literal: true

require "devise"
require "sorbet-runtime"

class Devise::SecretKeyFinder
  # Resolve deprecation.
  #
  # See: https://github.com/heartcombo/devise/issues/5644
  module Patch
    extend T::Sig

    # == Initialization
    sig { params(args: T.untyped, kwargs: T.untyped).void }
    def initialize(*args, **kwargs)
      super
      @application = T.let(@application, Rails::Application)
    end

    sig { returns(String) }
    def find
      @application.secret_key_base
    end
  end
  prepend Patch
end
