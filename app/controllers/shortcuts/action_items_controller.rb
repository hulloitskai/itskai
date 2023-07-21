# typed: true
# frozen_string_literal: true

module Shortcuts
  class ActionItemsController < ApplicationController
    # == Filters
    protect_from_forgery with: :null_session, only: :create

    # == Actions
    # POST /shortcuts/action_items
    def create
      item = ActionItem.new(**action_item_params.to_h)
      if item.valid?
        page = ActionItemsService.create_page(name: item.name!)
        render(plain: page.url, status: :created)
      else
        error_message = item.errors.full_messages.first!
        render(
          plain: "Invalid action item: #{error_message}",
          status: :unprocessable_entity,
        )
      end
    end

    # == Helpers
    sig { returns(ActionController::Parameters) }
    def action_item_params
      params.permit(:name)
    end
  end
end
