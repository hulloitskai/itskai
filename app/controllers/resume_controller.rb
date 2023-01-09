# typed: strict
# frozen_string_literal: true

class ResumeController < ApplicationController
  extend T::Sig

  # GET /resume
  sig { void }
  def show
    respond_to do |format|
      format.html do
        printable = params.key?("printable") && !params["printable"].falsy?
        data = query!("ResumePageQuery")
        render(inertia: "ResumePage", props: { printable:, data: })
      end
      format.json do
        result = Schema.execute("query { resume }")
        json = JSON.pretty_generate(result["data"]["resume"])
        render(json:)
      end
    end
  end
end
