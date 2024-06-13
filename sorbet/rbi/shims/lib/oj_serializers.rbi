# typed: strict

module OjSerializers
  class Serializer
    sig do
      params(
        name: Symbol,
        options: T.untyped,
        block: T.nilable(T.proc.bind(T.attached_class).void),
      ).returns(T.untyped)
    end
    def self.attribute(name = T.unsafe(nil), **options, &block); end
  end
end
