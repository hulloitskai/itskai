# typed: strict
# frozen_string_literal: true

module Types
  class TestModelType < Types::BaseObject
    global_id_field :id

    field :name, String, null: false
    field :birthday, DateTimeType
  end
end
