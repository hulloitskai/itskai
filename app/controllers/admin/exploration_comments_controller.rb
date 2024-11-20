# typed: true
# frozen_string_literal: true

module Admin
  class ExplorationCommentsController < AdminController
    # == Actions
    # POST /admin/exploration_comments
    def index
      explorations = authorized_scope(Exploration.all)
      scope = authorized_scope(ExplorationComment.reverse_chronological)
      pagy, comments = pagy(scope)
      render(inertia: "AdminExplorationCommentsPage", props: {
        explorations: ExplorationSerializer.many(explorations),
        comments: ExplorationCommentSerializer.many(comments),
        pagination: pagy_metadata(pagy),
      })
    end
  end
end
