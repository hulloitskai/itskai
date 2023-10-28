# typed: strict
# frozen_string_literal: true

begin
  require "bullet"
rescue LoadError
  return
end

require "sorbet-runtime"

class Bullet::Notification::Base
  # Don't log user.
  module Patch
    extend T::Sig

    sig { returns(T.nilable(String)) }
    def whoami
      nil
    end
  end
  prepend Patch
end
