# typed: strong

module ActiveForm::Base
  module GeneratedClassMethods
    sig { params(block: T.proc.bind(T.untyped).void).void }
    def after_initialization(&block); end

    sig { params(block: T.proc.bind(T.untyped).void).void }
    def before_initialization(&block); end

    def alias_param(alias_key, attribute_key); end

    def alias_boolean(name); end
  end
end
