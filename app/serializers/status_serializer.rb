# typed: true
# frozen_string_literal: true

# == Schema Information
#
# Table name: statuses
#
#  id         :uuid             not null, primary key
#  emoji      :string
#  text       :text             not null
#  created_at :datetime         not null
#
# Indexes
#
#  index_statuses_on_created_at  (created_at)
#
class StatusSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :emoji, :text, :created_at

  # == Associations
  has_one :image_blob, as: :image, serializer: ImageSerializer, nullable: true
end
