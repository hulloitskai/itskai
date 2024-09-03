# typed: true
# frozen_string_literal: true

module Cathendant
  class HomeController < ApplicationController
    # == Filters
    before_action :redirect_to_canonical_url, only: :show

    # == Actions
    # GET /cathendant
    def show
      memos = Memo.chronological
      render(inertia: "CathendantHomePage", props: {
        memos: MemoSerializer.many(memos),
      },)
    end

    # GET /cathendant/contribute
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
end
