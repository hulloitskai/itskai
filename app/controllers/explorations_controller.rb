# typed: true
# frozen_string_literal: true

class ExplorationsController < ApplicationController
  # == Actions
  def comment
    exploration_id = T.let(params.fetch(:exploration_id), String)
    comment = ExplorationComment.new(exploration_id:, **comment_params)
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
  sig { returns(ActionController::Parameters) }
  def comment_params
    params.require(:comment).permit(:message, :author_contact)
  end
end
