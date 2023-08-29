# typed: strong

class ApplicationCable::Channel
  sig { returns(T.nilable(User)) }
  attr_accessor :current_user

  sig { returns(ApplicationCable::Connection) }
  def connection; end
end
