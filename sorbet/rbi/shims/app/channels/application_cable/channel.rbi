# typed: strong

class ApplicationCable::Channel
  sig { returns(T.nilable(User)) }
  attr_accessor :current_user
end
