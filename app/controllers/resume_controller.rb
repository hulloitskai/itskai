# typed: true
# frozen_string_literal: true

class ResumeController < ApplicationController
  # == Actions
  # GET /resume
  def show
    respond_to do |format|
      format.html do
        printable = params.key?("printable") && !params["printable"].falsy?
        render(inertia: "ResumePage", props: { printable: })
      end
      format.json { render(json: ResumeService.load_resume) }
    end
  end
end
