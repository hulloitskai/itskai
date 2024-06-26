# typed: true
# frozen_string_literal: true

begin
  require "bullet"
rescue LoadError
  return
end

require "sorbet-runtime"

class Bullet::Notification::Base
  # Don't log user.
  module WithoutWhoami
    extend T::Sig

    sig { returns(T.nilable(String)) }
    def whoami
      nil
    end
  end
  prepend WithoutWhoami
end
