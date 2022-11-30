# typed: strict
# frozen_string_literal: true

module Types
  module SluggedType
    # == Definition
    include Types::BaseInterface

    # == Fields
    field :slug, String, null: false
  end
end
