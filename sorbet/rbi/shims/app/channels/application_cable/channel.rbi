# typed: strong

class ApplicationCable::Channel
  sig { returns(T.nilable(User)) }
  attr_reader :current_user

  sig { returns(T.nilable(ConnectionIdentity)) }
  attr_reader :connection_identity

  sig { returns(ApplicationCable::Connection) }
  def connection; end
end
