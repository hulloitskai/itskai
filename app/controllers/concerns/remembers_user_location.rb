# typed: true
# frozen_string_literal: true

module RemembersUserLocation
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { ActionController::Base }

  included do
    T.bind(self, T.class_of(ActionController::Base))

    # == Filters
    before_action :store_user_location!, if: :storable_location?
  end

  private

  # == Helpers
  sig { returns(T::Boolean) }
  def storable_location?
    request.get? && is_navigational_format? &&
      (!request.xhr? || request.inertia?) && !devise_controller?
  end

  # == Filter Handlers
  sig { void }
  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end
