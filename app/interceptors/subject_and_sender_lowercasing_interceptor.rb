# typed: strict
# frozen_string_literal: true

class SubjectAndSenderLowercasingInterceptor
  class << self
    extend T::Sig

    sig { params(message: Mail::Message).void }
    def delivering_email(message)
      lowercase_subject_and_sender(message)
    end

    sig { params(delivery: ActionMailer::MessageDelivery).void }
    def previewing_email(delivery)
      lowercase_subject_and_sender(delivery.message)
    end

    private

    sig { params(message: Mail::Message).void }
    def lowercase_subject_and_sender(message)
      message.subject.downcase!
      message.from_address.display_name.downcase!
    end
  end
end
