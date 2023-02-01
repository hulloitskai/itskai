# typed: strong

class ICloudCredentials
  sig { returns(T.nilable(T::Hash[String, T.untyped])) }
  def session; end

  sig do
    params(value: T.nilable(T::Hash[String, T.untyped]))
      .returns(T.nilable(T::Hash[String, T.untyped]))
  end
  def setters=(value); end
end
