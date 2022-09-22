# typed: strong

class ActionController::Base
  include Devise::Controllers::Helpers
end

class Devise::OmniauthCallbacksController
  include Devise::OmniAuth::UrlHelpers
end
