# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `NotifyFriendsOfStatusJob`.
# Please instead update this file by running `bin/tapioca dsl NotifyFriendsOfStatusJob`.


class NotifyFriendsOfStatusJob
  class << self
    sig do
      params(
        status: ::Status,
        block: T.nilable(T.proc.params(job: NotifyFriendsOfStatusJob).void)
      ).returns(T.any(NotifyFriendsOfStatusJob, FalseClass))
    end
    def perform_later(status, &block); end

    sig { params(status: ::Status).void }
    def perform_now(status); end
  end
end
