# typed: strong

module ActiveModel::Model
  sig { returns(ActiveModel::Name) }
  def model_name; end
end

class ActiveModel::Name
  sig do
    params(_arg0: T.untyped, _arg1: T.untyped, _arg2: T.untyped).returns(String)
  end
  def to_s(*_arg0, **_arg1, &_arg2); end

  sig do
    params(_arg0: T.untyped, _arg1: T.untyped, _arg2: T.untyped).returns(String)
  end
  def to_str(*_arg0, **_arg1, &_arg2); end
end

module ActiveModel::Validations
  sig { returns(ActiveModel::Errors) }
  def errors; end
end

class ActiveModel::Errors
  sig do
    params(
      args: T.untyped,
      _arg1: T.untyped,
      block: T.proc.params(error: ActiveModel::Error).void,
    ).void
  end
  def each(*args, **_arg1, &block); end

  sig { returns(T::Hash[Symbol, T::Array[ActiveModel::Error]]) }
  def group_by_attribute; end
end

class ActiveModel::Error
  sig { returns(Symbol) }
  def attribute; end
end
