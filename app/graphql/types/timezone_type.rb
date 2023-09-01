# typed: strict
# frozen_string_literal: true

module Types
  class TimezoneType < BaseObject
    # == Fields
    field :abbreviation, String, null: false
    field :name, String, null: false
    field :offset, String, null: false
    field :offset_minutes, Integer, null: false

    # == Methods
    sig { returns(TZInfo::DataTimezone) }
    def object
      super
    end

    # == Resolvers
    sig { returns(String) }
    def offset
      object.now.strftime("%z")
    end

    sig { returns(Integer) }
    def offset_minutes
      object.utc_offset.seconds.in_minutes.to_i
    end
  end
end
