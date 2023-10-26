# typed: strict
# frozen_string_literal: true

class LowercasingInterceptor
  class << self
    extend T::Sig

    sig { params(message: Mail::Message).void }
    def delivering_email(message)
      lowercase(message)
    end

    sig { params(delivery: ActionMailer::MessageDelivery).void }
    def previewing_email(delivery)
      lowercase(delivery.message)
    end

    private

    sig { params(message: Mail::Message).void }
    def lowercase(message)
      message.subject.downcase!
      message.from_address.display_name.downcase!
    end
  end
end
