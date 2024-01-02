# typed: strong

class TimelineActivity
  sig { returns(T::Range[Time]) }
  def duration; end

  sig { params(value: T::Range[Time]).returns(T::Range[Time]) }
  def duration=(value); end

  sig { returns(Location) }
  def location; end

  sig { params(value: Location).returns(Location) }
  def location=(value); end
end
