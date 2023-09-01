# typed: strict
# frozen_string_literal: true

require "active_support/core_ext"

begin
  require "bullet"
rescue LoadError
  return
end

class Bullet::Notification::Base
  module Extension
    extend T::Sig

    # Don't log user.
    sig { returns(T.nilable(String)) }
    def whoami
      nil
    end
  end

  prepend Extension
end
