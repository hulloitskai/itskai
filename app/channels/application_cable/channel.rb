# typed: strict
# frozen_string_literal: true

module ApplicationCable
  class Channel < ActionCable::Channel::Base
    extend T::Sig
    extend T::Helpers

    # == Exception handlers
    rescue_from Exception, with: :reject_exception
    rescue_from ActionPolicy::Unauthorized, with: :reject_unauthorized

    # == Methods
    sig { params(message: String).returns(TrueClass) }
    def reject_with(message)
      transmit({ error: message })
      reject
    end

    sig { returns(T.all(Object, GlobalID::Identification)) }
    def identity
      (current_user || connection_identity) or
        raise "Missing connection identifiers"
    end

    sig { override.void }
    def subscribe_to_channel
      run_callbacks(:subscribe) do
        subscribed
      end
    rescue => error
      rescue_with_handler(error) || raise
    ensure
      reject_subscription if subscription_rejected?
      ensure_confirmation_sent
    end

    private

    # == Helpers
    sig { params(error: ActionPolicy::Unauthorized).void }
    def reject_unauthorized(error)
      reject_with("Not authorized")
    end

    sig { params(error: Exception).void }
    def reject_exception(error)
      Rails.error.report(error)
      Sentry.capture_exception(error)
      reject_with(error.message)
    end
  end
end
