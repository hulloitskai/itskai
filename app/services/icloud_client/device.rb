# typed: strict
# frozen_string_literal: true

class ICloudClient
  class Device < T::Struct
    # == Properties
    const :id, String
    const :location, T.nilable(T::Hash[String, T.untyped])
  end
end
