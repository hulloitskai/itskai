# typed: strong

class Mutations::BaseMutation
  sig do
    params(
      args: T.untyped,
      kwargs: T.untyped,
      block: T.nilable(T.proc.bind(Types::BaseField).void),
    ).void
  end
  def self.field(*args, **kwargs, &block); end
end
