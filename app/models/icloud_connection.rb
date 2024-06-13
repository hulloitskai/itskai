# typed: strict
# frozen_string_literal: true

class ICloudConnection < T::Struct
  extend T::Sig

  # == Properties
  const :credentials, T.nilable(ICloudCredentials)
  const :status, Symbol

  # == Methods
  sig { returns(T.attached_class) }
  def self.current
    new(credentials: ICloudCredentials.current, status: ICloudctl.status)
  end
end
