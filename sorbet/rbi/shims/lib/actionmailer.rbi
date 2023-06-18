# typed: strong

module ActionMailer::Parameterized::ClassMethods
  sig { params(params: T.untyped).returns(T.self_type) }
  def with(params); end
end
