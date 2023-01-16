# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class NullBlankInviterNamesOnEventqrEvents < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    Eventqr::Event.where(inviter_name: "").update_all(inviter_name: nil)
  end
end
