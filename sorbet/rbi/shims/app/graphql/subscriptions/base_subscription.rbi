# typed: strong

module Subscriptions
  class BaseSubscription
    sig do
      params(
          args: T.untyped,
          kwargs: T.untyped,
          block: T.nilable(T.proc.bind(Types::BaseField).void),
        )
        .returns(T.untyped)
    end
    def self.field(*args, **kwargs, &block); end
  end
end
