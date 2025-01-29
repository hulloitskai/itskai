# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: location_accesses
#
#  id         :uuid             not null, primary key
#  token      :string           not null
#  created_at :datetime         not null
#  grant_id   :uuid             not null
#
# Indexes
#
#  index_location_accesses_on_grant_id  (grant_id)
#  index_location_accesses_on_token     (token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (grant_id => location_access_grants.id)
#
class LocationAccessSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes timestamp: { type: :string },
             accessor: { type: :string },
             password: { type: :string }
end
