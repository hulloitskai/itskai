# typed: strong

class ActionMailbox::Base
  sig do
    params(_arg0: T.untyped, _arg1: T.untyped, _arg2: T.untyped)
      .returns(Mail::Message)
  end
  def mail(*_arg0, **_arg1, &_arg2); end
end
