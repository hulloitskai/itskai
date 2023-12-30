# typed: strict
# frozen_string_literal: true

module Queries
  class UploadBySignedId < BaseQuery
    # == Definition
    type Types::ImageType, null: true

    # == Arguments
    argument :signed_id, String

    # == Resolver
    sig do
      params(signed_id: String).returns(T.nilable(ActiveStorage::Blob))
    end
    def resolve(signed_id:)
      ActiveStorage::Blob.find_signed(signed_id)
    end
  end
end
