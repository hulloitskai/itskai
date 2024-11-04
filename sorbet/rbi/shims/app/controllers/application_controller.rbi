# typed: strong

class ApplicationController
  sig { returns(T.nilable(User)) }
  def current_user; end

  sig { params(opts: T.untyped).returns(User) }
  def authenticate_user!(opts = {}); end
end
