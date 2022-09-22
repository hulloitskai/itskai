# typed: strong

module Followable
  include GeneratedAssociationMethods

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def follower_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def follower_ids=(ids); end

    sig { returns(::User::PrivateCollectionProxy) }
    def followers; end

    sig { params(value: T::Enumerable[::User]).void }
    def followers=(value); end

    sig { returns(T::Array[T.untyped]) }
    def following_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def following_ids=(ids); end

    sig { returns(::Following::PrivateCollectionProxy) }
    def followings; end

    sig { params(value: T::Enumerable[::Following]).void }
    def followings=(value); end
  end
end
