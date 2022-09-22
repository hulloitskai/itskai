# typed: strong

module Commentable
  include GeneratedAssociationMethods

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def comment_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def comment_ids=(ids); end

    sig { returns(::Comment::PrivateCollectionProxy) }
    def comments; end

    sig { params(value: T::Enumerable[::Comment]).void }
    def comments=(value); end
  end
end
