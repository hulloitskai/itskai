# typed: true
# frozen_string_literal: true

class CathendantMemoSerializer < ApplicationSerializer
  # == Configuration
  object_as :memo, model: "CathendantMemo"

  # == Attributes
  identifier
  attributes :from
  attribute :recording_url, type: :string do
    rails_blob_path(memo.recording_blob)
  end
end
