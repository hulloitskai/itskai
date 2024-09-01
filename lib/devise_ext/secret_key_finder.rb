# typed: true
# frozen_string_literal: true

class Devise::SecretKeyFinder
  module Patch
    extend T::Sig

    sig { returns(String) }
    def find
      @application.secret_key_base
    end
  end

  include Patch
end
