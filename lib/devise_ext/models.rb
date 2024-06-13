# typed: strict
# frozen_string_literal: true

require "devise"

module Devise::Models
  module Authenticatable
    remove_method(:inspect)
    remove_method(:serializable_hash)
  end
end
