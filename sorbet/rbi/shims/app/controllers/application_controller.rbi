# typed: strong

class ApplicationController
  sig { returns(T.nilable(User)) }
  def current_user; end

  # TODO: What's the return type?
  sig { returns(T.untyped) }
  def user_session; end

  sig { returns(T::Boolean) }
  def user_signed_in?; end
end
