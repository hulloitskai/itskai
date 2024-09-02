# typed: strict
# frozen_string_literal: true

class ReverseGeocodeLocationLogJob < ApplicationJob
  # == Errors
  class TimeoutError < StandardError; end

  # == Configuration
  good_job_control_concurrency_with(
    key: -> {
      T.bind(self, ReverseGeocodeLocationLogJob)
      log, *_ = arguments
      "#{self.class.name}(#{log.to_gid})"
    },
    total_limit: 1,
  )
  retry_on Geocoder::OverQueryLimitError, TimeoutError,
    wait: :polynomially_longer

  # == Job
  sig { params(log: LocationLog).void }
  def perform(log)
    Timeout.timeout(10, TimeoutError) do
      log.reverse_geocode
    end
  end
end
