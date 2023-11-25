# typed: true
# frozen_string_literal: true

class CreateTaskRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :task_records, id: false do |t|
      t.string :version, null: false
    end
  end
end
