# typed: strong

module ActionMailer
  class Base
    sig { returns(Mail::Message) }
    def message; end
  end

  module Parameterized::ClassMethods
    sig { params(params: T.untyped).returns(T.self_type) }
    def with(params); end
  end
end
