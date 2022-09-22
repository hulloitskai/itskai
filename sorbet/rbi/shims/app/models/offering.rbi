# typed: strong

class Offering
  sig { returns(T.nilable(T.all(Object, RGeo::Feature::Geometry))) }
  def location; end
end
