# frozen_string_literal: true

namespace :after_party do
  desc "Deployment task: send_another_welcome_email_to_test_preview_text"
  task send_another_welcome_email_to_test_preview_text: :environment do
    puts "Running deploy task 'send_another_welcome_email_to_test_preview_text'"

    # Put your task implementation HERE.
    User.owner!.send_welcome_email

    # Update task as completed.  If you remove the line below, the task will
    # run with every deploy (or every time you call after_party:run).
    AfterParty::TaskRecord
      .create(version: AfterParty::TaskRecorder.new(__FILE__).timestamp)
  end
end
