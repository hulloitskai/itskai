# typed: true
# frozen_string_literal: true

class ExplorationCommentSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :created_at, :exploration_id, :message, :author_contact
end
