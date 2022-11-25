# typed: strong

module ActiveSupport::Dependencies
  sig { returns(Interlock) }
  def self.interlock; end
end

module ActiveSupport::Tryable
  sig do
    type_parameters(:U)
      .params(
        args: T.untyped,
        kwargs: T.untyped,
        block: T.proc.params(object: T.self_type).returns(T.type_parameter(:U)),
      )
      .returns(T.type_parameter(:U))
  end
  def try!(*args, **kwargs, &block); end
end

class Object
  sig { returns(T::Boolean) }
  def present?; end
end

class String
  sig do
    params(position: T.any(Integer, T::Range[Integer], Regexp, String))
      .returns(T.nilable(String))
  end
  def at(position); end

  sig { returns(T::Boolean) }
  def blank?; end

  sig { params(first_letter: Symbol).returns(String) }
  def camelcase(first_letter = :upper); end

  sig { params(first_letter: Symbol).returns(String) }
  def camelize(first_letter = :upper); end
end

class Hash
  sig { returns(ActiveSupport::HashWithIndifferentAccess) }
  def with_indifferent_access; end
end

class Time
  sig { params(zone: T.untyped).returns(ActiveSupport::TimeWithZone) }
  def in_time_zone(zone = T.unsafe(nil)); end
end

module Enumerable
  sig do
    type_parameters(:U)
      .params(block: T.proc.params(arg0: Elem).returns(T.type_parameter(:U)))
      .returns(T::Hash[T.type_parameter(:U), Elem])
  end
  def index_by(&block); end
end
