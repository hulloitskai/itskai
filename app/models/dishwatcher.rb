# typed: strict
# frozen_string_literal: true

module Dishwatcher
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "dishwatcher_"
  end
end
