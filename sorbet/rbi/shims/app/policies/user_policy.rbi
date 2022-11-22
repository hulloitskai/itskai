# typed: strong

class UserPolicy
  sig { returns(T.nilable(User)) }
  def record; end
end
