# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `SyncJournalEntriesJob`.
# Please instead update this file by running `bin/tapioca dsl SyncJournalEntriesJob`.

class SyncJournalEntriesJob
  class << self
    sig do
      params(
        block: T.nilable(T.proc.params(job: SyncJournalEntriesJob).void)
      ).returns(T.any(SyncJournalEntriesJob, FalseClass))
    end
    def perform_later(&block); end

    sig { void }
    def perform_now; end
  end
end
