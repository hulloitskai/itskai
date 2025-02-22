# typed: true
# frozen_string_literal: true

class LocationAccessSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes timestamp: { type: :string },
             accessor: { type: :string },
             password: { type: :string }
end
