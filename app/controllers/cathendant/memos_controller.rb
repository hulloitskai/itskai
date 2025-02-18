# typed: true
# frozen_string_literal: true

module Cathendant
  class MemosController < ApplicationController
    # == Actions
    # POST /cathendant/memos
    def create
      memo_params = params.expect(memo: %i[from recording])
      Memo.create!(memo_params)
      render(json: {}, status: :created)
    rescue => error
      logger.error("Failed to create Cathendant memo: #{error}")
      raise
    end
  end
end
