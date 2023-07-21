# typed: true
# frozen_string_literal: true

class ActionItem < ApplicationModel
  # == Attributes
  attribute :name, :string
  validates :name, presence: true, length: { maximum: 64 }

  sig { returns(String) }
  def name!
    name or "Missing name"
  end
end
