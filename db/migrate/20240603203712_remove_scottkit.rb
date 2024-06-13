# typed: true
# frozen_string_literal: true

class RemoveScottkit < ActiveRecord::Migration[7.1]
  def change
    drop_table :scottcalls
  end
end
