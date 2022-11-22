# typed: strong

module ActiveSupport::Dependencies
  sig { returns(Interlock) }
  def self.interlock; end
end

class Object
  sig { returns(T::Boolean) }
  def present?; end
end

class Hash
  sig { returns(ActiveSupport::HashWithIndifferentAccess) }
  def with_indifferent_access; end
end

class Time
  sig { params(zone: T.untyped).returns(ActiveSupport::TimeWithZone) }
  def in_time_zone(zone = T.unsafe(nil)); end
end
