# typed: true
# frozen_string_literal: true

class ExplorationSerializer < ApplicationSerializer
  identifier type: :string
  attributes label: { type: :string }
end
