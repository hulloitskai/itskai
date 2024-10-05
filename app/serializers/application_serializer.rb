# frozen_string_literal: true

class ApplicationSerializer < Oj::Serializer
  extend T::Sig
  include TypesFromSerializers::DSL
  include Routing

  # == Rendering
  def render_as_hash(item, options = nil)
    super.compact
  end
end
