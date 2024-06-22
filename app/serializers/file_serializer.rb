# typed: true
# frozen_string_literal: true

class FileSerializer < ApplicationSerializer
  # == Configuration
  identifier
  object_as :blob, model: "ActiveStorage::Blob"

  # == Attributes
  attributes :filename, :byte_size, signed_id: { type: :string }

  attribute :src, type: :string do
    rails_blob_path(blob)
  end
end
