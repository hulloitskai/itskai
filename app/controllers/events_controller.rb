# typed: true
# frozen_string_literal: true

class EventsController < ApplicationController
  # == Filters
  before_action :authenticate_user!

  # == Actions
  def index
    authorize!
    @events = Event.recent
    render(formats: :text)
  end
end
