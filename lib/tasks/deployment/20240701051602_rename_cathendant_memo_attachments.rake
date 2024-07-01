# frozen_string_literal: true

namespace :after_party do
  desc "Deployment task: rename_cathendant_memo_attachments"
  task rename_cathendant_memo_attachments: :environment do
    puts "Running deploy task 'rename_cathendant_memo_attachments'"

    # Put your task implementation HERE.
    ActiveStorage::Attachment
      .where(record_type: "CathendantMemo")
      .update_all(record_type: "Cathendant::Memo") # rubocop:disable Rails/SkipsModelValidations

    # Update task as completed.  If you remove the line below, the task will
    # run with every deploy (or every time you call after_party:run).
    AfterParty::TaskRecord
      .create(version: AfterParty::TaskRecorder.new(__FILE__).timestamp)
  end
end
