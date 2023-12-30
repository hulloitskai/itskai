# typed: strict
# frozen_string_literal: true

module Sources
  class AttachedBlob < BaseSource
    sig do
      params(model_class: T.class_of(ActiveRecord::Base), name: Symbol).void
    end
    def initialize(model_class, name)
      super()
      @model_class = model_class
      @name = name
    end

    # == Fetching
    sig do
      params(ids: T::Array[String])
        .returns(T::Array[T.nilable(ActiveStorage::Blob)])
    end
    def fetch(ids)
      attachments = ActiveStorage::Attachment
        .includes(:blob)
        .where(
          record_type: @model_class.name,
          record_id: ids,
          name: @name,
        )
        .to_a
      attachments_by_record_id = attachments.index_by(&:record_id)
      ids.map { |id| attachments_by_record_id[id]&.blob }
    end
  end
end
