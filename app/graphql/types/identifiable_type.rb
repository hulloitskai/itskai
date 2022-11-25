# typed: strict
# frozen_string_literal: true

module Types
  module IdentifiableType
    # == Definition ==
    include Types::BaseInterface

    # == Interfaces ==
    implements NodeType

    # == Fields ==
    field :short_id,
          ShortIDType,
          null: false,
          description: "ShortID of the object."
  end
end
