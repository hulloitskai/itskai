# typed: true
# frozen_string_literal: true

class AnnouncementsService < ApplicationService
  class << self
    # == Methods
    sig { returns(T.nilable(String)) }
    def announcement
      checked { instance.announcement }
    end
  end

  # == Methods
  sig { returns(T.nilable(String)) }
  def announcement
    ENV["ANNOUNCEMENT"]
  end
end
