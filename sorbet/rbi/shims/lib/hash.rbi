# typed: strong

class Hash
  sig { params(args: K).returns(T::Array[V]) }
  def fetch_values(*args); end
end
