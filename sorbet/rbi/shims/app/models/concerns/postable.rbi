# typed: strong

module Postable
  include GeneratedAssociationMethods

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def post_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def post_ids=(ids); end

    sig { returns(::Post::PrivateCollectionProxy) }
    def posts; end

    sig { params(value: T::Enumerable[::Post]).void }
    def posts=(value); end
  end
end
