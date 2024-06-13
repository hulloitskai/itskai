# typed: true
# frozen_string_literal: true

class RemoveSenecaMoodLogs < ActiveRecord::Migration[7.1]
  def change
    drop_table :seneca_mood_logs
  end
end
