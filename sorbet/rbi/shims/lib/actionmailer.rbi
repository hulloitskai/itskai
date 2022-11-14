# typed: strong

module ActionMailer::Parameterized::ClassMethods
  sig { params(params: T.untyped).returns(T.self_type) }
  def with(params); end
end

class ActionMailer::Base
  sig { params(headers: T.untyped, block: T.untyped).returns(Mail::Message) }
  def mail(headers = nil, &block); end
end
