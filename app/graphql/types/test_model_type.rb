# typed: strict
# frozen_string_literal: true

module Types
  class TestModelType < BaseObject
    global_id_field :id

    field :birthday, DateType
    field :name, String, null: false
  end
end
