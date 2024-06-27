# typed: true
# frozen_string_literal: true

class ApplicationParameters < ApplicationModel
  sig { params(params: ActionController::Parameters).void }
  def initialize(params)
    super(params.to_unsafe_h.slice(*self.class.attribute_names))
  end
end
