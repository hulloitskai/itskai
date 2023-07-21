# typed: true
# frozen_string_literal: true

module Shortcuts
  class ActionItemsController < ApplicationController
    # == Filters
    protect_from_forgery with: :null_session, only: :create
    before_action :verify_secret_key, only: :create

    # == Actions
    # POST /shortcuts/action_items
    def create
      item = ActionItem.new(**action_item_params.to_h)
      if item.valid?
        ActionItemsService.create_page(name: item.name!)
        render(plain: "Done", status: :created)
      else
        error_message = item.errors.full_messages.first!
        render(
          plain: "Invalid action item: #{error_message}",
          status: :unprocessable_entity,
        )
      end
    end

    private

    # == Helpers
    sig { returns(ActionController::Parameters) }
    def action_item_params
      params.permit(:name)
    end
  end
end
