# typed: strict
# frozen_string_literal: true

require "devise"
require "sorbet-runtime"

module Devise::Models
  module Authenticatable
    remove_method(:inspect)
    remove_method(:serializable_hash)

    # Send emails in a new thread.
    module Patch
      extend T::Sig

      # == Methods
      sig { params(notification: Symbol, args: T.untyped).void }
      def send_devise_notification(notification, *args)
        th = Thread.new do
          Rails.application.executor.wrap do
            super
          end
        end
        th.join
      end
    end
    prepend Patch
  end
end
