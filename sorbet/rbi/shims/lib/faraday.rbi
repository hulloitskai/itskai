# typed: strong

module Faraday
  sig do
    params(
      url: String,
      params: T::Hash[T.untyped, T.untyped],
      headers: T::Hash[T.untyped, T.untyped],
    ).returns(Response)
  end
  def self.get(
    url = T.unsafe(nil),
    params = T.unsafe(nil),
    headers = T.unsafe(nil)
  ); end

  sig do
    params(
      url: String,
      params: T::Hash[T.untyped, T.untyped],
      headers: T::Hash[T.untyped, T.untyped],
    ).returns(Response)
  end
  def self.head(
    url = T.unsafe(nil),
    params = T.unsafe(nil),
    headers = T.unsafe(nil)
  ); end

  sig do
    params(
      url: String,
      body: T.untyped,
      headers: T::Hash[T.untyped, T.untyped],
      block: T.nilable(T.proc.params(request: Request).void),
    ).returns(Response)
  end
  def self.post(
    url = T.unsafe(nil),
    body = T.unsafe(nil),
    headers = T.unsafe(nil),
    &block
  ); end

  class Connection
    sig do
      params(
        url: String,
        params: T::Hash[T.untyped, T.untyped],
        headers: T::Hash[T.untyped, T.untyped],
      ).returns(Response)
    end
    def get(
      url = T.unsafe(nil),
      params = T.unsafe(nil),
      headers = T.unsafe(nil)
    ); end

    sig do
      params(
        url: String,
        params: T::Hash[T.untyped, T.untyped],
        headers: T::Hash[T.untyped, T.untyped],
      ).returns(Response)
    end
    def head(
      url = T.unsafe(nil),
      params = T.unsafe(nil),
      headers = T.unsafe(nil)
    ); end

    sig do
      params(
        url: String,
        body: T.untyped,
        headers: T::Hash[T.untyped, T.untyped],
        block: T.nilable(T.proc.params(request: Request).void),
      ).returns(Response)
    end
    def post(
      url = T.unsafe(nil),
      body = T.unsafe(nil),
      headers = T.unsafe(nil),
      &block
    ); end
  end
end
