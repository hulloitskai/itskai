# typed: strong

class User
  include Devise::Models::Authenticatable
  include Devise::Models::DatabaseAuthenticatable
  include Devise::Models::Registerable
  include Devise::Models::Recoverable
  include Devise::Models::Validatable
  include Devise::Models::Confirmable
  include Devise::Models::Trackable
  include Devise::Models::Omniauthable
  include Devise::Models::Rememberable
end

module Devise::Controllers::Helpers
  sig { params(opts: T.untyped).returns(User) }
  def authenticate_user!(opts = T.unsafe(nil)); end
end
