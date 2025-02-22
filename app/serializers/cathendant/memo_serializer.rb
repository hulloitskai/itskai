# typed: true
# frozen_string_literal: true

module Cathendant
  class MemoSerializer < ApplicationSerializer
    # == Configuration
    object_as :memo

    # == Attributes
    identifier
    attributes :from
    attribute :recording_url, type: :string do
      rails_blob_path(memo.recording_blob)
    end
  end
end
