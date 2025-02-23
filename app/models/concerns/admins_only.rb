# typed: true
# frozen_string_literal: true

module AdminsOnly
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { ActionController::Base }

  included do
    T.bind(self, T.class_of(ActionController::Base))

    before_action :authorize_action!
  end

  private

  sig { void }
  def authorize_action!
    user = authenticate_user!
    authorize!(user, to: :administrate?)
  end
end
