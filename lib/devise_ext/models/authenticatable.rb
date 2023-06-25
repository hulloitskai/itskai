# typed: strict
# frozen_string_literal: true

module Devise::Models
  module Authenticatable
    remove_method(:inspect)
    remove_method(:serializable_hash)

    module Extension
      extend T::Sig

      sig { params(notification: Symbol, args: T.untyped).void }
      def send_devise_notification(notification, *args)
        thread = Thread.new { super }
        thread.join
      end
    end

    prepend Extension
  end
end
