# typed: strict
# frozen_string_literal: true

class LinearIssuesController < ApplicationController
  # == Configuration
  protect_from_forgery with: :null_session, only: :create

  # == Actions
  # POST /issues
  sig { void }
  def create
    issue = Linear.create_issue(**T.unsafe(issue_params))
    issue_payload = issue.to_h.slice("id", "title", "description")
    render(json: issue_payload)
  end

  private

  # == Helpers
  sig { returns(ActionController::Parameters) }
  def issue_params
    params.permit(:title, :description)
  end
end
