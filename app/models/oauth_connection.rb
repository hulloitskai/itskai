# typed: strict
# frozen_string_literal: true

class OAuthConnection < T::Struct
  extend T::Sig

  # == Properties
  const :provider, Symbol
  const :credentials, T.nilable(OAuthCredentials)
  const :status, Symbol

  # == Methods
  sig { returns(T.attached_class) }
  def self.google
    credentials = OAuthCredentials.google
    new(
      provider: :google,
      credentials:,
      status: credentials.present? ? :connected : :disconnected,
    )
  end

  sig { returns(T.attached_class) }
  def self.spotify
    credentials = OAuthCredentials.spotify
    new(
      provider: :spotify,
      credentials:,
      status: credentials.present? ? :connected : :disconnected,
    )
  end
end
