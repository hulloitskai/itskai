# typed: strict
# frozen_string_literal: true

module Journey
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "journey_"
  end
end
