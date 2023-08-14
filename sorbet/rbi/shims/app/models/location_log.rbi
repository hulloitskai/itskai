# typed: strong

class LocationLog
  sig { returns(RGeo::Geographic::SphericalPointImpl) }
  def coordinates; end

  sig do
    params(value: RGeo::Geographic::SphericalPointImpl)
      .returns(RGeo::Geographic::SphericalPointImpl)
  end
  def coordinates=(value); end
end
