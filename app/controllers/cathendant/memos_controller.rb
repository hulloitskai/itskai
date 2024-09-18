# typed: true
# frozen_string_literal: true

module Cathendant
  class MemosController < ApplicationController
    # == Actions
    # POST /cathendant/memos
    def create
      Memo.create!(memo_params)
      render(json: {}, status: :created)
    rescue => error
      logger.error("Failed to create Cathendant memo: #{error}")
      raise
    end

    private

    sig { returns(ActionController::Parameters) }
    def memo_params
      params.require(:memo).permit(:from, :recording)
    end
  end
end
