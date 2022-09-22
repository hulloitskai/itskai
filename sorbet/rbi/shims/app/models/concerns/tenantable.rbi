# typed: strong

module Tenantable
  include GeneratedAssociationMethods

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def tenant_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def tenant_ids=(ids); end

    sig { returns(::Tenant::PrivateCollectionProxy) }
    def tenants; end

    sig { params(value: T::Enumerable[::Tenant]).void }
    def tenants=(value); end
  end
end
