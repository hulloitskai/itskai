# typed: true
# frozen_string_literal: true

class CathendantsController < ApplicationController
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
end
