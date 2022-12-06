# typed: strong

class GlobalID
  sig {params(_arg0: T.untyped, _arg1: T.untyped, _arg2: T.untyped).returns(String)}
  def to_s(*_arg0, **_arg1, &_arg2); end
end

module GlobalID::Identification
  sig { params(options: T.untyped).returns(GlobalID) }
  def to_gid(options = T.unsafe(nil)); end

  sig { params(options: T.untyped).returns(GlobalID) }
  def to_global_id(options = T.unsafe(nil)); end
end

class ActiveRecord::Base
  include GlobalID::Identification
end
