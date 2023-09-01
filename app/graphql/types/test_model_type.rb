# typed: strict
# frozen_string_literal: true

module Types
  class TestModelType < BaseObject
    # == Fields
    field :birthday, DateType
    field :id, ID, null: false
    field :name, String, null: false
  end
end
