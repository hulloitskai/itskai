# typed: true
# frozen_string_literal: true

class ApplicationParameters < ApplicationModel
  sig do
    params(params: T.any(
      ActionController::Parameters,
      T::Hash[String, T.untyped],
    )).void
  end
  def initialize(params)
    params = params.to_unsafe_h if params.is_a?(ActionController::Parameters)
    super(params.slice(*self.class.attribute_names))
  end
end
