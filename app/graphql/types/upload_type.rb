# typed: strict
# frozen_string_literal: true

module Types
  module UploadType
    extend T::Sig
    extend T::Helpers

    include Resolver
    include BaseInterface

    # == Annotations
    abstract!

    # == Definition
    definition_methods do
      extend T::Sig

      sig do
        params(object: ActiveStorage::Blob, context: GraphQL::Query::Context)
          .returns(T.nilable(String))
      end
      def resolve_type(object, context)
        if object.image?
          "::Types::ImageType"
        else
          "::Types::FileType"
        end
      end
    end

    # == Fields
    field :signed_id, String, null: false
    field :filename, String, null: false
    field :byte_size, Integer, null: false
    field :url, String, null: false

    # == Resolvers
    sig { returns(String) }
    def url
      rails_blob_url(object)
    end

    # == Helpers
    sig { returns(ActiveStorage::Blob) }
    def object = super
  end
end
