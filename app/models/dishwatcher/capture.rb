# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: dishwatcher_captures
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  device_id  :uuid             not null
#
# Indexes
#
#  index_dishwatcher_captures_on_device_id  (device_id)
#
# Foreign Keys
#
#  fk_rails_...  (device_id => dishwatcher_devices.id)
#
module Dishwatcher
  class Capture < ApplicationRecord
    # == Associations
    belongs_to :device

    # == Attachments
    has_one_attached :recording
  end
end
