# typed: strict
# frozen_string_literal: true

module Routing
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { Kernel }

  included do
    include Rails.application.routes.url_helpers
  end

  # == Methods
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def default_url_options
    Rails.application.routes.url_helpers.url_options
  end
end
