# frozen_string_literal: true

namespace :after_party do
  desc "Deployment task: reverse_geocode_location_logs_without_address"
  task reverse_geocode_location_logs_without_address: :environment do
    puts "Running deploy task 'reverse_geocode_location_logs_without_address'"

    # Reverse geocode location logs with missing addresses
    LocationLog.where.missing(:address).find_each(&:reverse_geocode_later)

    # Update task as completed.  If you remove the line below, the task will
    # run with every deploy (or every time you call after_party:run).
    AfterParty::TaskRecord
      .create version: AfterParty::TaskRecorder.new(__FILE__).timestamp
  end
end
