# typed: strict
# frozen_string_literal: true

module Types
  class ScottkitSignalType < BaseEnum
    # == Values
    value "BREAK", value: :break
    value "RAND", value: :rand
    value "PANIC", value: :panic
  end
end
