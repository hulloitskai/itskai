# typed: strong

module Devise
  sig { params(length: Integer).returns(String) }
  def self.friendly_token(length = T.unsafe(nil)); end
end

class ActionController::Base
  include Devise::Controllers::Helpers
  include Devise::Controllers::UrlHelpers
end
