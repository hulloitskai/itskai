# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: exploration_comments
#
#  id             :uuid             not null, primary key
#  author_contact :string           not null
#  message        :text             not null
#  created_at     :datetime         not null
#  exploration_id :string           not null
#
class ExplorationCommentSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :created_at, :exploration_id, :message, :author_contact
end
