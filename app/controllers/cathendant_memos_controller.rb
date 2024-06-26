# typed: true
# frozen_string_literal: true

class CathendantMemosController < ApplicationController
  # == Actions
  # POST /cathendant/memos
  def create
    CathendantMemo.create!(memo_params)
    render(json: {})
  rescue => error
    logger.error("Failed to create Cathendant memo: #{error}")
    Rails.error.report(error)
    Sentry.capture_exception(error)
    render(json: { error: error.message }, status: :unprocessable_entity)
  end

  private

  sig { returns(ActionController::Parameters) }
  def memo_params
    params.require(:memo).permit(:from, :recording)
  end
end
