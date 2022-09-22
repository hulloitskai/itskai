# typed: strong

module ActiveModel
  module Model
    sig { returns(Name) }
    def model_name; end
  end

  module Validations
    sig { returns(Errors) }
    def errors; end
  end

  class Errors
    sig do
      params(
        args: T.untyped,
        _arg1: T.untyped,
        block: T.proc.params(error: Error).void,
      ).void
    end
    def each(*args, **_arg1, &block); end
  end
end
