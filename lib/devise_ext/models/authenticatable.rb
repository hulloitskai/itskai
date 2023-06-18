# typed: strict
# frozen_string_literal: true

module Devise::Models::Authenticatable
  remove_method(:inspect)
  remove_method(:serializable_hash)

  protected

  T::Sig::WithoutRuntime.sig do
    params(notification: Symbol, args: T.untyped).void
  end
  def send_devise_notification(notification, *args)
    message = devise_mailer.send(notification, self, *args)
    message.deliver_later
  end
end
