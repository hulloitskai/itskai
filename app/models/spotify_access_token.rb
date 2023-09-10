# typed: strict
# frozen_string_literal: true

class SpotifyAccessToken < T::Struct
  extend T::Sig

  # == Properties
  const :value, String
  const :expires_at, Time

  # == Methods
  sig { returns(T::Boolean) }
  def expired?
    expires_at < Time.current
  end
end
