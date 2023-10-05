# typed: strict
# frozen_string_literal: true

class LocationDetails < T::Struct
  extend T::Sig

  # == Properties
  const :log, LocationLog
  const :access_grant, LocationAccessGrant

  # == Methods
  delegate :coordinates, to: :log
  delegate :expires_at, to: :access_grant

  sig { returns(String) }
  def address
    log.address!.full_address
  end

  sig { returns(T::Enumerable[LocationLog]) }
  def trail
    last_timestamp = log.timestamp
    first_timestamp = last_timestamp - 30.minutes
    LocationLog
      .where(timestamp: first_timestamp..last_timestamp)
      .order(timestamp: :desc)
  end
end
