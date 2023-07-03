# typed: true
# frozen_string_literal: true

class ReimportJournalEntries < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      dir.up do
        JournalEntry.find_each do |entry|
          DownloadJournalEntryJob.perform_later(entry)
        end
      end
    end
  end
end
