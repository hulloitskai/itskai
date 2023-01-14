# typed: strict
# frozen_string_literal: true

module Eventqr
  class EventGenerateQrCodeImageJob < ApplicationJob
    extend T::Sig

    # == Configuration
    good_job_control_concurrency_with(
      key: -> do
        T.bind(self, EventGenerateQrCodeImageJob)
        event = T.let(arguments.first, Event)
        "#{self.class.name}:#{event.id}"
      end,
      total_limit: 1,
    )

    # == Job
    sig { params(event: Event).returns(ActiveStorage::Blob) }
    def perform(event)
      unless QrCodeGenerator.ready?
        logger.warn("QRCodeGenerator not ready; skipping")
        nil
      end

      url = Rails.application.routes.url_helpers.url_for(event)
      QrCodeGenerator.generate_qr_code(url) do |file|
        event.qr_code_image.attach(io: file, filename: "qrcode.png")
      end
      event.qr_code_image_blob!
    end
  end
end
