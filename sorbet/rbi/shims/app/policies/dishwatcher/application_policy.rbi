# typed: strong

module Dishwatcher
  class ApplicationPolicy
    sig { returns(T.nilable(String)) }
    def device_secret_key; end
  end
end
