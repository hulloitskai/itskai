# typed: true
# frozen_string_literal: true

module Dishwatcher
  class DevicesController < ApplicationController
    # == Actions
    def show
      data = query!("DishwatchDevicePageQuery", {
        device_id: device.to_gid.to_s,
      })
      render(inertia: "DishwatchDevicePage", props: { data: })
    end

    private

    # == Helpers
    sig { returns(Device) }
    def device
      Device.find(params.fetch(:id))
    end
  end
end
