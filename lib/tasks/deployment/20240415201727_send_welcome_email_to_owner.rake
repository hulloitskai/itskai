# frozen_string_literal: true

namespace :after_party do
  desc "Deployment task: send_welcome_email_to_owner"
  task send_welcome_email_to_owner: :environment do
    puts "Running deploy task 'send_welcome_email_to_owner'"

    # Put your task implementation HERE.
    if (owner = User.owner)
      owner.send_welcome_email
    end

    # Update task as completed.  If you remove the line below, the task will
    # run with every deploy (or every time you call after_party:run).
    AfterParty::TaskRecord
      .create(version: AfterParty::TaskRecorder.new(__FILE__).timestamp)
  end
end
