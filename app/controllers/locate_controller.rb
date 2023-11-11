# typed: true
# frozen_string_literal: true

class LocateController < ApplicationController
  # == Filters
  before_action :authenticate_user!, only: :grant

  # == Actions
  def show
    params = LocateParams.new(self.params.permit(:password))
    params.validate!
    render(inertia: "LocatePage", props: { password: params.password })
  end

  def grant
    authorize!(with: LocatePolicy)
    recipient = l(Time.current, format: :short)
    expires_at = 3.hours.from_now
    LocationAccessGrant.create!(recipient:, expires_at:)
    redirect_to(
      admin_path,
      notice: "Location access granted until #{l(expires_at, format: :short)}",
    )
  end
end
