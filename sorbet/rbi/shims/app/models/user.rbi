# typed: strong

class User
  include Devise::Models::Authenticatable
  include Devise::Models::Invitable
  include Devise::Models::Confirmable
  include Devise::Models::DatabaseAuthenticatable
  include Devise::Models::Registerable
  include Devise::Models::Recoverable
  include Devise::Models::Trackable
  include Devise::Models::Validatable
end
