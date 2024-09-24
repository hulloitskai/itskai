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
    comment = ExplorationComment.new(
      exploration_id: params[:exploration_id],
      **comment_params,
    )
    if comment.save
      render(json: {})
    else
      render(
        json: { errors: comment.form_errors },
        status: :unprocessable_entity,
      )
    end
  end
end
