# typed: true
# frozen_string_literal: true

class ResumeController < ApplicationController
  # == Actions
  # GET /resume
  def show
    respond_to do |format|
      format.html do
        printable = params.key?("printable") && !params["printable"].falsy?
        data = query!("ResumePageQuery")
        render(inertia: "ResumePage", props: { printable:, data: })
      end
      format.json { render(json: Resume.load) }
    end
  end
end
