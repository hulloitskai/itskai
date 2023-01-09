# typed: strict
# frozen_string_literal: true

class WorkController < ApplicationController
  extend T::Sig

  # GET /work
  sig { void }
  def show
    data = query!("WorkPageQuery")
    render(inertia: "WorkPage", props: { data: })
  end
end
