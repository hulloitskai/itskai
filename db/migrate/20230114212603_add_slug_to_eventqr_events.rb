# rubocop:disable Rails/SkipsModelValidations
# typed: ignore
# frozen_string_literal: true

class AddSlugToEventqrEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :eventqr_events, :slug, :string
    Eventqr::Event.find_each do |event|
      event.update_column("slug", Eventqr::Event.generate_slug)
    end
    change_column_null :eventqr_events, :slug, false
  end
end
