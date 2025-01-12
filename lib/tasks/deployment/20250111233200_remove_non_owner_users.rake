# frozen_string_literal: true

namespace :after_party do
  desc "Deployment task: remove_non_owner_users"
  task remove_non_owner_users: :environment do
    puts "Running deploy task 'remove_non_owner_users'"

    # Put your task implementation HERE.
    User.where.not(email: Owner.email).destroy_all

    # Update task as completed.  If you remove the line below, the task will
    # run with every deploy (or every time you call after_party:run).
    AfterParty::TaskRecord
      .create(version: AfterParty::TaskRecorder.new(__FILE__).timestamp)
  end
end
