# typed: strict
# frozen_string_literal: true

module PoorlyDrawnLines
  class Comic < ApplicationModel
    include GlobalID::Identification

    # == Attributes
    attribute :id, :string
    attribute :image_url, :string
    attribute :previous_url, :string
    attribute :next_url, :string

    sig { returns(String) }
    def id!
      id or raise "Missing ID"
    end

    sig { returns(String) }
    def image_url!
      image_url or raise "Missing image URL"
    end

    sig { returns(String) }
    def previous_url!
      previous_url or raise "Missing previous URL"
    end

    sig { returns(String) }
    def next_url!
      next_url or raise "Missing next URL"
    end

    # == Validations
    validates :id, presence: true
    validates :image_url, presence: true
    validates :previous_url, :next_url, presence: true
  end
end
