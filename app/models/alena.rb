# typed: strict
# frozen_string_literal: true

module Alena
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "alena_"
  end
end
