# typed: strict
# frozen_string_literal: true

class ActiveSupport::ErrorReporter
  T::Sig::WithoutRuntime.sig do
    type_parameters(:T)
      .params(
        error_class: Class,
        fallback: T.proc.returns(T.type_parameter(:T)),
        severity: Symbol,
        context: T::Hash[Symbol, T.untyped],
        block: T.proc.returns(T.type_parameter(:T)),
      ).returns(T.type_parameter(:T))
  end
  def handle_with_fallback(
    error_class = StandardError,
    fallback:,
    severity: :warning,
    context: {},
    &block
  )
    result = handle(error_class, severity:, context:, fallback:, &block)
    T.must(result)
  end
end
