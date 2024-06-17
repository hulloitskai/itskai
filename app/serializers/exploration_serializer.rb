# typed: true
# frozen_string_literal: true

class ExplorationSerializer < ApplicationSerializer
  attributes id: { identifier: true, type: :string }, label: { type: :string }
end
