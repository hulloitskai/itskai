# typed: true
# frozen_string_literal: true

require "inertia_rails"
require_relative "asset_helper"

module InertiaRails
  module Controller
    extend ActiveSupport::Concern
    extend T::Sig
    extend T::Helpers

    requires_ancestor { ActionController::Base }

    # == Included
    remove_instance_variable :@_included_block
    included do
      T.bind(self, T.class_of(ActionController::Base))

      helper Helper
      helper AssetHelper
    end
  end
end
