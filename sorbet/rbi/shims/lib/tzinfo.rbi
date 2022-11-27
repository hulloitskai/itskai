# typed: strong

class TZInfo::Timezone
  sig { params(time: T.untyped).returns(Integer) }
  def utc_offset(time = T.unsafe(nil)); end

  sig { returns(ActiveSupport::TimeWithZone) }
  def now; end
end
