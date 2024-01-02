# typed: strong

class LocationLog
  sig { returns(RGeo::Feature::Point) }
  def coordinates; end

  sig { params(value: RGeo::Feature::Point).returns(RGeo::Feature::Point) }
  def coordinates=(value); end
end
