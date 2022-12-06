# typed: strict
# frozen_string_literal: true

module Sources
  class RecordById < BaseSource
    sig { params(model_class: T.class_of(ActiveRecord::Base)).void }
    def initialize(model_class)
      super()
      @model_class = model_class
    end

    sig do
      params(ids: T::Array[String])
        .returns(T::Array[T.nilable(ActiveRecord::Base)])
    end
    def fetch(ids)
      records = @model_class.where(id: ids)
      # Return a list with `nil` for any ID that wasn't found.
      ids.map { |id| records.find { |r| r.id == id } }
    end
  end
end
