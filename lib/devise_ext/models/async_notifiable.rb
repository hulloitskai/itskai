# typed: strict
# frozen_string_literal: true

module Devise::Models
  module AsyncNotifiable
    extend ActiveSupport::Concern
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { ActiveRecord::Base }
    requires_ancestor { Authenticatable }

    included do
      T.bind(self, T.class_of(ActiveRecord::Base))

      # == Callbacks
      after_commit :send_pending_devise_notifications
    end

    protected

    # == Helpers
    sig { params(notification: Symbol, args: T.untyped).void }
    def send_devise_notification(notification, *args)
      message = devise_mailer.send(notification, self, *args)
      message.deliver_later
    end

    private

    # == Helpers
    sig { returns(T::Array[Symbol]) }
    def pending_devise_notifications
      @pending_devise_notifications = T.let(@pending_devise_notifications,
                                            T.nilable(T::Array[Symbol]))
      @pending_devise_notifications ||= []
    end

    sig { params(notification: Symbol, args: T.untyped).void }
    def render_and_send_devise_message(notification, *args)
      message = devise_mailer.send(notification, self, *args)
      message.deliver_later
    end

    # == Callbacks
    sig { void }
    def send_pending_devise_notifications
      pending_devise_notifications.each do |notification, args|
        render_and_send_devise_message(notification, *args)
      end
      pending_devise_notifications.clear
    end
  end
end
