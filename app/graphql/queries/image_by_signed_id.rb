# typed: strict
# frozen_string_literal: true

module Queries
  class ImageBySignedId < BaseQuery
    # == Type
    type Types::ImageType, null: true

    # == Arguments
    argument :signed_id, String

    # == Resolver
    sig { params(signed_id: String).returns(T.nilable(ActiveStorage::Blob)) }
    def resolve(signed_id:)
      ActiveStorage::Blob.find_signed(signed_id)
    end
  end
end
