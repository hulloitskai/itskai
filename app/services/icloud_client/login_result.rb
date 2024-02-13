# typed: strict
# frozen_string_literal: true

class ICloudClient
  class LoginResult < T::Struct
    # == Properties
    const :success, TrueClass
    const :requires_2fa, T::Boolean
  end
end
