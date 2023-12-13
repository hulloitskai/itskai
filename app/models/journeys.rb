# typed: strict
# frozen_string_literal: true

module Journeys
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "journeys_"
  end
end
