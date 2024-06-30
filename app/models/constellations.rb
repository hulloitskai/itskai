# typed: true
# frozen_string_literal: true

module Constellations
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "constellations_"
  end
end
