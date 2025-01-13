# typed: true
# frozen_string_literal: true

class NoticeableSerializer < ApplicationSerializer
  # == Attributes
  identifier type: :string
  attribute :type, type: :string do
    noticeable.model_name.to_s
  end
end
