# typed: true
# frozen_string_literal: true

class ExplorationSerializer < ApplicationSerializer
  attributes id: { type: :string, identifier: true }, label: { type: :string }
end
