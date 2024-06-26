# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `ActiveStorage::CleanupBlobsJob`.
# Please instead update this file by running `bin/tapioca dsl ActiveStorage::CleanupBlobsJob`.


class ActiveStorage::CleanupBlobsJob
  class << self
    sig do
      params(
        block: T.nilable(T.proc.params(job: ActiveStorage::CleanupBlobsJob).void)
      ).returns(T.any(ActiveStorage::CleanupBlobsJob, FalseClass))
    end
    def perform_later(&block); end

    sig { void }
    def perform_now; end
  end
end
