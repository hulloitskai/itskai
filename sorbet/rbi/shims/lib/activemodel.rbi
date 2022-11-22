# typed: strong

module ActiveModel::Model
  sig { returns(ActiveModel::Name) }
  def model_name; end
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
end

class ActiveModel::Error
  sig { returns(Symbol) }
  def attribute; end
end
