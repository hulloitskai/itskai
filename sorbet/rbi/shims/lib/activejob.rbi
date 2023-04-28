# typed: strong

module ActiveJob::Core
  sig { returns(T::Array[T.untyped])}
  def arguments; end
end
