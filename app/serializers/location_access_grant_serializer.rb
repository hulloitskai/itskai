# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: location_access_grants
#
#  id         :uuid             not null, primary key
#  expires_at :datetime         not null
#  password   :string           not null
#  recipient  :string           not null
#  created_at :datetime         not null
#
# Indexes
#
#  index_location_access_grants_on_password  (password)
#
class LocationAccessGrantSerializer < ApplicationSerializer
  # == Configuration
  object_as :grant, model: "LocationAccessGrant"

  # == Attributes
  identifier
  attributes :recipient, :password, :created_at, :expires_at
end
