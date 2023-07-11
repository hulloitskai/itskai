# typed: strong

module Types
  class BaseObject
    sig do
      override.params(
        args: T.untyped,
        kwargs: T.untyped,
        block: T.nilable(T.proc.bind(Types::BaseField).void),
      ).void
    end
    def self.field(*args, **kwargs, &block); end
  end
end
