# typed: true
# frozen_string_literal: true

class LinearIssuesController < ApplicationController
  # == Configuration
  protect_from_forgery with: :null_session, only: :create

  # == Actions
  # POST /issues
  def create
    issue_params = self.issue_params
    title = issue_params[:title] or raise "Missing title"
    title = T.cast(title, String)
    description = issue_params[:description]
    description = T.cast(description, T.nilable(String))
    issue = LinearService.create_issue(title:, description:).tap do |issue|
      if NotifiService.ready?
        NotifiService.notify(
          title: "Issue added to Linear",
          message: issue.title,
          link: issue.url,
        )
      else
        logger.warn("Notify is not ready; skipping notifying...")
      end
    end
    issue_payload = issue.to_h
  rescue => error
    respond_to do |format|
      format.html { raise }
      format.json do
        render(
          status: :internal_server_error,
          json: { error: error.message },
        )
      end
    end
  else
    respond_to do |format|
      format.html do
        redirect_to(root_path, notice: "Issue added successfully!")
      end
      format.json do
        render(json: { issue: issue_payload })
      end
    end
  end

  private

  # == Helpers
  sig { returns(ActionController::Parameters) }
  def issue_params
    params.permit(:title, :description)
  end
end
