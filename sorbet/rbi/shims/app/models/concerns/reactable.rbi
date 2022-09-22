# typed: strong

module Reactable
  include GeneratedAssociationMethods

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def reactor_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def reactor_ids=(ids); end

    sig { returns(::User::PrivateCollectionProxy) }
    def reactors; end

    sig { params(value: T::Enumerable[::User]).void }
    def reactors=(value); end

    sig { returns(T::Array[T.untyped]) }
    def reaction_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def reaction_ids=(ids); end

    sig { returns(::Reaction::PrivateCollectionProxy) }
    def reactions; end

    sig { params(value: T::Enumerable[::Reaction]).void }
    def reactions=(value); end
  end
end
