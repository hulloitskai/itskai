# typed: strong

class ActionController::Base
  include Devise::Controllers::Helpers
  include Devise::Controllers::UrlHelpers
end

# class Devise::OmniauthCallbacksController
#   include Devise::OmniAuth::UrlHelpers
# end

module Devise
  sig { params(length: Integer).returns(String) }
  def self.friendly_token(length = T.unsafe(nil)); end
end
