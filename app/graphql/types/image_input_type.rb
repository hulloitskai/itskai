# typed: strict
# frozen_string_literal: true

module Types
  class ImageInputType < BaseInputObject
    # == Arguments
    argument :signed_id, String

    # == Preparation
    sig { returns(String) }
    def prepare
      signed_id
    end
  end
end
