# typed: strong

class Following
  sig { returns(T.nilable(T.any(Business, Community))) }
  def followable; end
end
