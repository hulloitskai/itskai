# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: dishwatcher_devices
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  secret_key :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_dishwatcher_devices_on_secret_key  (secret_key) UNIQUE
#
module Dishwatcher
  class Device < ApplicationRecord
    # == Attributes
    attribute :secret_key, :string, default: -> { SecureRandom.hex(16) }

    # == Associations
    has_many :captures, dependent: :destroy

    # == Validations
    validates :name, presence: true
  end
end
