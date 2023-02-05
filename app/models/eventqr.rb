# typed: true
# frozen_string_literal: true

module Eventqr
  extend T::Sig

  sig { returns(String) }
  def self.table_name_prefix
    "eventqr_"
  end
end
