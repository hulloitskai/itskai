# typed: strict
# frozen_string_literal: true

class TimelineActivitiesParameters < ApplicationParameters
  # == Attributes
  attribute :after, :datetime
  attribute :before, :datetime

  # == Validations
  validates :after, :before, presence: true
end
