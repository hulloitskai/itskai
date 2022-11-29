# typed: strict

class Object
  include WrappedPrint::Main
end

module WrappedPrint::Main
  sig do
    params(
      label: T.nilable(String),
      pattern: String,
      count: Integer,
      prefix: String,
      suffix: String,
      color: Symbol,
    ).returns(T.self_type)
  end
  def wp(
    label = nil,
    pattern: T.unsafe(nil),
    count: T.unsafe(nil),
    prefix: T.unsafe(nil),
    suffix: T.unsafe(nil),
    color: T.unsafe(nil)
  ); end
end
