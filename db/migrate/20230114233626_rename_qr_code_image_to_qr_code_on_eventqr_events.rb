# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class RenameQrCodeImageToQrCodeOnEventqrEvents < ActiveRecord::Migration[7.0]
  def change
    ActiveStorage::Attachment.where(
      record_type: "Eventqr::Event",
      name: "qr_code_image",
    ).update_all(name: "qr_code")
  end
end
