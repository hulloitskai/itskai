# typed: true
# frozen_string_literal: true

class AddLikesCountToPensieveMessages < ActiveRecord::Migration[7.1]
  def change
    add_column :pensieve_messages,
               :likes_count,
               :integer,
               null: false,
               default: 0

    up_only do
      PensieveMessageLike.counter_culture_fix_counts(only: :message)
    end
  end
end
