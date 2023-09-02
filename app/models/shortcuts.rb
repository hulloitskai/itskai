# typed: strict
# frozen_string_literal: true

module Shortcuts
  class << self
    extend T::Sig

    # == Accessors
    sig { returns(T.nilable(String)) }
    def secret_key
      ENV["SHORTCUTS_SECRET_KEY"]
    end

    sig { returns(String) }
    def secret_key!
      secret_key or raise "Secret key not set"
    end
  end
end
