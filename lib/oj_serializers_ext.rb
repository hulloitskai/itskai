# typed: true
# frozen_string_literal: true

class OjSerializers::Serializer
  remove_const(:KNOWN_ATTRIBUTE_OPTIONS)

  KNOWN_ATTRIBUTE_OPTIONS = %i[
    attribute
    association
    identifier
    if
    optional
    nullable
    type
    serializer
  ].to_set
end
