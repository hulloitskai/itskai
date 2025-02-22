# typed: true
# frozen_string_literal: true

class ExplorationCommentNotificationPayloadSerializer < ApplicationSerializer
  # == Configuration
  object_as :exploration_comment

  # == Attributes
  identifier
  attributes message_snippet: { type: :string },
             exploration_label: { type: :string }
end
