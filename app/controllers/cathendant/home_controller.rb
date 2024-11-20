# typed: true
# frozen_string_literal: true

module Cathendant
  class HomeController < ApplicationController
    # == Actions
    # GET /cathendant
    def show
      if request.hostname == "cathy.earth" && request.path != "/"
        redirect_to(root_path) and return
      end

      memos = Memo.chronological
      render(inertia: "CathendantHomePage", props: {
        memos: MemoSerializer.many(memos),
      })
    end

    # GET /cathendant/contribute
    def contribute
      render(inertia: "CathendantContributePage")
    end
  end
end
