# typed: strong

module Galleryable
  include GeneratedAssociationMethods
  include GeneratedAttributeMethods

  sig { returns(ActiveStorage::Attached::Many) }
  def images; end

  sig { params(attachable: T.untyped).returns(T.untyped) }
  def images=(attachable); end

  module GeneratedAssociationMethods
    sig { returns(T::Array[T.untyped]) }
    def images_attachment_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def images_attachment_ids=(ids); end

    sig { returns(::ActiveStorage::Attachment::PrivateCollectionProxy) }
    def images_attachments; end

    sig { params(value: T::Enumerable[::ActiveStorage::Attachment]).void }
    def images_attachments=(value); end

    sig { returns(T::Array[T.untyped]) }
    def images_blob_ids; end

    sig { params(ids: T::Array[T.untyped]).returns(T::Array[T.untyped]) }
    def images_blob_ids=(ids); end

    sig { returns(::ActiveStorage::Blob::PrivateCollectionProxy) }
    def images_blobs; end

    sig { params(value: T::Enumerable[::ActiveStorage::Blob]).void }
    def images_blobs=(value); end
  end

  module GeneratedAttributeMethods
    sig { returns(T.untyped) }
    def images_attachment_ids; end

    sig { params(value: T.untyped).returns(T.untyped) }
    def images_attachment_ids=(value); end

    sig { returns(T::Boolean) }
    def images_attachment_ids?; end

    sig { returns(T.untyped) }
    def images_attachment_ids_before_last_save; end

    sig { returns(T.untyped) }
    def images_attachment_ids_before_type_cast; end

    sig { returns(T::Boolean) }
    def images_attachment_ids_came_from_user?; end

    sig { returns(T.nilable([T.untyped, T.untyped])) }
    def images_attachment_ids_change; end

    sig { returns(T.nilable([T.untyped, T.untyped])) }
    def images_attachment_ids_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def images_attachment_ids_changed?; end

    sig { returns(T.untyped) }
    def images_attachment_ids_in_database; end

    sig { returns(T.nilable([T.untyped, T.untyped])) }
    def images_attachment_ids_previous_change; end

    sig { returns(T::Boolean) }
    def images_attachment_ids_previously_changed?; end

    sig { returns(T.untyped) }
    def images_attachment_ids_previously_was; end

    sig { returns(T.untyped) }
    def images_attachment_ids_was; end

    sig { void }
    def images_attachment_ids_will_change!; end
  end
end
