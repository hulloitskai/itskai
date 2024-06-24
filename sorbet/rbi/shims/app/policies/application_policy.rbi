# typed: strong

class ApplicationPolicy
  sig { returns(T.nilable(User)) }
  def user; end
end
