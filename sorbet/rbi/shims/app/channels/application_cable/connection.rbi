# typed: strong

class ApplicationCable::Connection
  sig { returns(T.nilable(User)) }
  attr_accessor :current_user
end
