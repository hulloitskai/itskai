# typed: true
# frozen_string_literal: true

module Cathendant
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "cathendant_"
  end
end
