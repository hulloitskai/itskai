# typed: strong

class Tenant
  sig { returns(T.nilable(T.any(Business, Community))) }
  def resource; end
end
