# typed: strict
# frozen_string_literal: true

class Object
  T::Sig::WithoutRuntime.sig { params(modules: Module).returns(T::Boolean) }
  def is_any?(*modules) # rubocop:disable Naming/PredicateName
    modules.any? { |klass| is_a?(klass) }
  end

  T::Sig::WithoutRuntime.sig { returns(FalseClass) }
  def truthy?
    false
  end

  T::Sig::WithoutRuntime.sig { returns(FalseClass) }
  def falsy?
    false
  end
end

class String
  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def truthy?
    case downcase
    when "t", "true", "1", "yes"
      true
    else
      false
    end
  end

  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def falsy?
    case downcase
    when "f", "false", "0", "no"
      true
    else
      false
    end
  end
end

class Integer
  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def truthy?
    self > 0
  end

  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def falsy?
    self == 0
  end
end

class Float
  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def truthy?
    self > 0
  end

  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def falsy?
    self == 0
  end
end

class NilClass
  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def truthy?
    false
  end

  T::Sig::WithoutRuntime.sig { returns(T::Boolean) }
  def falsy?
    false
  end
end

module Kernel
  # Execute the provided block; used to as an alternative to (begin...end) that
  # does not pollute the local scope with variables declared in the block.
  T::Sig::WithoutRuntime.sig do
    type_parameters(:T)
      .params(block: T.proc.returns(T.type_parameter(:T)))
      .returns(T.type_parameter(:T))
  end
  def scoped(&block)
    yield
  end
end

class Logger::Formatter
  extend T::Sig

  FORMAT = "%4s [%s #%d]: %s\n" unless const_defined?(:FORMAT)

  sig do
    params(
        severity: T.untyped,
        time: T.untyped,
        progname: T.untyped,
        msg: T.untyped,
      )
      .returns(String)
  end
  def call(severity, time, progname, msg)
    format(FORMAT, severity, format_datetime(time), Process.pid, msg2str(msg))
  end
end
