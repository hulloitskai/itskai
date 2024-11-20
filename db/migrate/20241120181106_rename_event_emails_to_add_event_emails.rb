# typed: true
# frozen_string_literal: true

class RenameEventEmailsToAddEventEmails < ActiveRecord::Migration[7.1]
  def change
    rename_table :event_emails, :add_event_emails
  end
end
