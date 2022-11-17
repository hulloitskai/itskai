# typed: strict
# frozen_string_literal: true

class WorkController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    data = query!("WorkPageQuery")
    render(inertia: "WorkPage", props: { data: data })
  end
end
