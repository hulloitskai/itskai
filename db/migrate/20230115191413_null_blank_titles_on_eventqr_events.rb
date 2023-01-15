# rubocop:disable Rails/SkipsModelValidations
# typed: true
# frozen_string_literal: true

class NullBlankTitlesOnEventqrEvents < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    Eventqr::Event.where(title: "").update_all(title: nil)
  end
end
