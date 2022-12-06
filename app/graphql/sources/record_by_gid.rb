# typed: strict
# frozen_string_literal: true

module Sources
  class RecordByGid < BaseSource
    sig do
      params(ids: T::Array[String])
        .returns(T::Array[T.nilable(ActiveRecord::Base)])
    end
    def fetch(ids)
      GlobalID::Locator.locate_many(ids, ignore_missing: true)
    end
  end
end
