# typed: strong

class ApplicationController
  sig { returns(T.nilable(User)) }
  def current_user; end

  sig { returns(User) }
  def authenticate_user!; end
end
