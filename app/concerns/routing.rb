# typed: strict
# frozen_string_literal: true

module Routing
  extend T::Sig
  extend T::Helpers

  requires_ancestor { Kernel }

  extend ActiveSupport::Concern

  included do
    include Rails.application.routes.url_helpers
  end

  sig { returns(T::Hash[Symbol, T.untyped]) }
  def default_url_options
    Rails.application.routes.url_helpers.url_options
  end
end
