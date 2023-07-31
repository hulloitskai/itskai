# typed: true
# frozen_string_literal: true

class LocationService < ApplicationService
  class << self
    # == Lifecycle
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = ICloudService.disabled? || super
    end

    # == Synchronization
    sig { void }
    def sync
      checked { instance.sync }
    end

    sig { void }
    def sync_later
      SyncLocationJob.perform_later
    end

    # == Methods
    sig { returns(T.nilable(Time)) }
    def hide_until
      return @hide_until if defined?(@hide_until)
      @hide_until = T.let(@hide_until, T.nilable(Time))
      @hide_until = suppress(ArgumentError) do
        setting("HIDE_UNTIL")&.to_time
      end
    end

    sig { returns(T.nilable(LocationLog)) }
    def displayed_location = instance.displayed_location
  end

  # == Lifecycle
  sig { override.returns(T::Boolean) }
  def ready?
    ICloudService.ready? && super
  end

  # == Synchronization
  sig { void }
  def sync
    location = ICloudService.iphone.location
    timestamp = Time.zone.at(location[:time_stamp] / 1000)
    LocationLog.find_or_create_by!(timestamp:) do |log|
      log.coordinates = scoped do
        location => { latitude:, longitude:, altitude: }
        LocationLog.coordinates_factory.point(longitude, latitude, altitude)
      end
      log.attributes = location.slice(
        :horizontal_accuracy,
        :vertical_accuracy,
        :floor_level,
      )
    end
  end

  # == Methods
  sig { returns(T.nilable(LocationLog)) }
  def displayed_location
    LocationLog.latest(timestamp: 6.hours.ago..) unless hide?
  end

  private

  # == Helpers
  sig { returns(T.nilable(Time)) }
  def hide_until = self.class.hide_until

  sig { returns(T::Boolean) }
  def hide?
    if (hide_until = self.hide_until)
      hide_until > Time.zone.now
    else
      false
    end
  end
end
