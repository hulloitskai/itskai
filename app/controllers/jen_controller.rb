# typed: strict
# frozen_string_literal: true

class JenController < ApplicationController
  extend T::Sig

  sig { void }
  def show
    set_meta_tags(noindex: true)
    data = query!("JenPageQuery")
    render(inertia: "JenPage", props: { data: data })
  end
end
