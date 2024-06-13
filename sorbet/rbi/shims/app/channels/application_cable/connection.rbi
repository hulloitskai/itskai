# typed: strong

class ApplicationCable::Connection
  sig { returns(T.nilable(User)) }
  attr_accessor :current_user

  sig {returns(T.nilable(ConnectionIdentity))}
  attr_accessor :connection_identity
end
