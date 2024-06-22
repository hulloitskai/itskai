# typed: true
# frozen_string_literal: true

class CathendantMemosController < ApplicationController
  # == Actions
  # TODO: Make this work with fetch instead of inertia!
  def create
    CathendantMemo.create!(memo_params)
    flash.notice = "Your voice has been added :)"
    redirect_to(cathendant_path, notice: "Your voice has been added :)")
  rescue => error
    logger.error("Failed to create Cathendant memo: #{error}")
    Rails.error.report(error)
    Sentry.capture_exception(error)
    redirect_to(contribute_cathendant_path, alert: "Failed to create memo")
  end

  private

  sig { returns(ActionController::Parameters) }
  def memo_params
    params.require(:memo).permit(:from, :recording)
  end
end
