# typed: strong

module GlobalID::Identification
  sig { params(options: T.untyped).returns(GlobalID) }
  def to_gid(options = T.unsafe(nil)); end

  sig { params(options: T.untyped).returns(GlobalID) }
  def to_global_id(options = T.unsafe(nil)); end
end

class ActiveRecord::Base
  include GlobalID::Identification
end
