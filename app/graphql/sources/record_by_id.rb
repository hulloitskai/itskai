# typed: strict
# frozen_string_literal: true

module Sources
  class RecordById < BaseSource
    sig { params(model_class: T.class_of(ActiveRecord::Base)).void }
    def initialize(model_class)
      super()
      @model_class = model_class
    end

    # == Fetching
    sig do
      params(ids: T::Array[String])
        .returns(T::Array[T.nilable(ActiveRecord::Base)])
    end
    def fetch(ids)
      records = @model_class.where(id: ids)
      records_by_id = records.index_by(&:id)
      ids.map { |id| records_by_id[id] }
    end
  end
end
