# typed: true
# frozen_string_literal: true

class CathendantsController < ApplicationController
  # == Filters
  before_action :redirect_to_canonical_url, only: :show

  # == Actions
  def show
    memos = CathendantMemo.chronological
    render(inertia: "CathendantPage", props: {
      memos: CathendantMemoSerializer.many(memos),
    })
  end

  def contribute
    render(inertia: "CathendantContributePage")
  end

  private

  # == Helpers
  sig { void }
  def redirect_to_canonical_url
    if request.hostname == "cathy.earth" && request.path != "/"
      redirect_to(root_path)
    end
  end
end
