# typed: strict
# frozen_string_literal: true

module Journey
  class ApplicationController < ::ApplicationController
    # == Filters
    before_action :set_participant_id

    private

    # == Helpers
    sig { returns(String) }
    def participant_id
      cookies.signed[:journey_participant_id] or
        raise "Missing journey participant ID"
    end

    # == Filter Callbacks
    sig { void }
    def set_participant_id
      return if cookies.key?(:journey_participant_id)
      cookies.permanent.signed[:journey_participant_id] = SecureRandom.uuid
    end
  end
end
