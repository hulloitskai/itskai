# typed: strong

module Grouplike
  include GeneratedAssociationMethods

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def member_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def member_ids=(ids); end

    sig { returns(::User::PrivateCollectionProxy) }
    def members; end

    sig { params(value: T::Enumerable[::User]).void }
    def members=(value); end

    sig { returns(T::Array[T.untyped]) }
    def membership_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def membership_ids=(ids); end

    sig { returns(::Membership::PrivateCollectionProxy) }
    def memberships; end

    sig { params(value: T::Enumerable[::Membership]).void }
    def memberships=(value); end
  end
end
