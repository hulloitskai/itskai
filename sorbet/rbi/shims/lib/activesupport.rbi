# typed: strong

module ActiveSupport
  module Dependencies
    sig { returns(Interlock) }
    def self.interlock; end
  end

  class Duration
    sig { returns(Float) }
    def in_days; end

    sig { returns(Float) }
    def in_hours; end

    sig { returns(Float) }
    def in_minutes; end

    sig { returns(Float) }
    def in_months; end

    sig { returns(Float) }
    def in_seconds; end

    sig { returns(Float) }
    def in_weeks; end

    sig { returns(Float) }
    def in_years; end
  end

  class ErrorReporter
    sig do
      params(
        error_classes: T::Class[T.anything],
        severity: Symbol,
        context: T::Hash[Symbol, T.untyped],
        fallback: T.nilable(T.proc.returns(T.untyped)),
        source: String,
        block: T.proc.returns(T.untyped),
      ).returns(T.untyped)
    end
    def handle(
      *error_classes,
      severity: :warning,
      context: {},
      fallback: nil,
      source: "application",
      &block
    ); end

    sig do
      type_parameters(:T).
        params(
          error_classses: T::Class[T.anything],
          severity: Symbol,
          context: T::Hash[Symbol, T.untyped],
          source: String,
          block: T.proc.returns(T.type_parameter(:T)),
        ).returns(T.type_parameter(:T))
    end
    def record(
      *error_classses,
      severity: :error,
      context: {},
      source: "application",
      &block
    ); end
  end

  class TimeWithZone < Time
    sig { params(format: String).returns(String) }
    def strftime(format); end

    sig {returns(Time)}
    def to_time
    end
  end

  class TimeZone
    sig { returns(Time) }
    def now; end
  end

  module Tryable
    sig do
      type_parameters(:U)
        .params(
          args: T.untyped,
          kwargs: T.untyped,
          block: T.proc.params(arg0: T.self_type).returns(T.type_parameter(:U)),
        )
        .returns(T.nilable(T.type_parameter(:U)))
    end
    def try!(*args, **kwargs, &block); end
  end
end

module Kernel
  sig do
    type_parameters(:U)
      .params(
        exception_classes: T::Class[T.anything],
        block: T.proc.returns(T.type_parameter(:U)),
      )
      .returns(T.nilable(T.type_parameter(:U)))
  end
  def suppress(*exception_classes, &block); end
end

class Object
  sig { returns(T::Boolean) }
  def present?; end
end

class Numeric
  sig { returns(ActiveSupport::Duration) }
  def day; end

  sig { returns(ActiveSupport::Duration) }
  def days; end

  sig { returns(ActiveSupport::Duration) }
  def fortnight; end

  sig { returns(ActiveSupport::Duration) }
  def fortnights; end

  sig { returns(ActiveSupport::Duration) }
  def hour; end

  sig { returns(ActiveSupport::Duration) }
  def hours; end

  sig { returns(ActiveSupport::Duration) }
  def minute; end

  sig { returns(ActiveSupport::Duration) }
  def minutes; end

  sig { returns(ActiveSupport::Duration) }
  def second; end

  sig { returns(ActiveSupport::Duration) }
  def seconds; end

  sig { returns(ActiveSupport::Duration) }
  def week; end

  sig { returns(ActiveSupport::Duration) }
  def weeks; end
end

class String
  sig do
    params(
      position: T.any(Integer, T::Range[Integer], Regexp, String),
    ).returns(T.nilable(String))
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

  sig { returns(ActiveSupport::TimeZone) }
  def self.zone; end
end

module Enumerable
  sig do
    type_parameters(:U)
      .params(block: T.proc.params(arg0: Elem).returns(T.type_parameter(:U)))
      .returns(T::Hash[T.type_parameter(:U), Elem])
  end
  def index_by(&block); end
end
