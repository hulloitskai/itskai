# typed: strong

module ActiveSupport
  module Dependencies
    sig { returns(Interlock) }
    def self.interlock; end
  end
end

class Object
  sig { returns(T::Boolean) }
  def present?; end
end

class Hash
  sig { returns(ActiveSupport::HashWithIndifferentAccess) }
  def with_indifferent_access; end
end
