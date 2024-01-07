# typed: strong

module Devise
  class RegistrationsController
    protected

    sig { params(hash: T::Hash[String, T.untyped]).returns(User) }
    def build_resource(hash = {}); end
  end
end
