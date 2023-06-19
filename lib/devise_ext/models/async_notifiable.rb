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
      if new_record? || saved_changes?
        pending_devise_notifications << [notification, args]
      else
        model = T.unsafe(self)
        model.send_devise_notification_later(notification, *args)
      end
    end

    sig { params(notification: Symbol, args: T.untyped).void }
    def send_devise_notification_later(notification, *args)
      message = devise_mailer.send(notification, self, *args)
      message.deliver_later
    end

    private

    # == Helpers
    sig { returns(T::Array[[Symbol, T::Array[T.untyped]]]) }
    def pending_devise_notifications
      @pending_devise_notifications = T.let(
        @pending_devise_notifications,
        T.nilable(T::Array[[Symbol, T::Array[T.untyped]]]),
      )
      @pending_devise_notifications ||= []
    end

    # == Callbacks
    sig { void }
    def send_pending_devise_notifications
      pending_devise_notifications.each do |notification, args|
        model = T.unsafe(self)
        model.send_devise_notification_later(notification, *args)
      end
      pending_devise_notifications.clear
    end
  end
end
