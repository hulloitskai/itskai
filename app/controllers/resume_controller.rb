# typed: strict
# frozen_string_literal: true

class ResumeController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    respond_to do |format|
      format.html do
        printable = params.key?("printable") && !params["printable"].falsy?
        render(component: "ResumePage", props: { printable: printable })
      end
      format.json do
        result = Schema.execute("query { resume }")
        render(json: JSON.pretty_generate(result["data"]["resume"]))
      end
    end
  end
end
