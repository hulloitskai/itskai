# typed: true
# frozen_string_literal: true

class StatusSerializer < ApplicationSerializer
  # == Attributes
  identifier
  attributes :emoji, :text, :created_at
end
