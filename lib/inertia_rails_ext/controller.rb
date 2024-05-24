# typed: true
# frozen_string_literal: true

require "inertia_rails"

module InertiaRails
  module Controller
    extend T::Helpers

    requires_ancestor { ActionController::Base }

    # == Included
    remove_instance_variable :@_included_block
    included do
      T.bind(self, T.class_of(ActionController::Base))

      before_action :share_inertia_errors
      helper Helper
    end

    private

    # == Callbacks
    def share_inertia_errors
      if (errors = session[:inertia_errors].presence)
        InertiaRails.share(errors: errors)
      end
    end
  end
end
