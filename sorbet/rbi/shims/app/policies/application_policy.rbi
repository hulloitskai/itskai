# typed: strong

class ApplicationPolicy
  sig { returns(T.nilable(User)) }
  def user; end

  sig { returns(T.nilable(Friend)) }
  def friend; end
end
