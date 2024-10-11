# typed: true
# frozen_string_literal: true

class ExplorationsController < ApplicationController
  # == Actions
  # POST /explorations/:exploration_id/comment
  def comment
    comment_params = params.require(:comment).permit(
      :message,
      :author_contact,
    )
    comment = ExplorationComment.new(exploration_id, **comment_params)
    if comment.save
      render(json: {})
    else
      render(
        json: { errors: comment.form_errors },
        status: :unprocessable_entity,
      )
    end
  end

  private

  # == Helpers
  sig { returns(String) }
  def exploration_id
    exploration_id = params.fetch(:exploration_id)
    raise "Invalid exploration ID" unless exploration_id.is_a?(String)
    exploration_id
  end
end
