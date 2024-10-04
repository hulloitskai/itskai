# typed: true
# frozen_string_literal: true

class Devise::SecretKeyFinder
  module Patch
    def find
      @application.secret_key_base
    end
  end

  include Patch
end
