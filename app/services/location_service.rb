# typed: true
# frozen_string_literal: true

class LocationService < ApplicationService
  class << self
    # == Service
    sig { override.returns(T::Boolean) }
    def disabled?
      return !!@disabled if defined?(@disabled)
      @disabled = T.let(@disabled, T.nilable(T::Boolean))
      @disabled = ICloudService.disabled? || super
    end

    # == Methods: Sync
    sig { void }
    def sync
      checked { instance.sync }
    end

    sig { void }
    def sync_later
      SyncLocationJob.perform_later
    end
  end

  # == Initialization
  sig { void }
  def initialize
    super
    @client = T.let(Notion::Client.new, Notion::Client)
  end

  # == Service
  sig { override.returns(T::Boolean) }
  def ready?
    ICloudService.ready? && super
  end

  # == Methods
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
end
