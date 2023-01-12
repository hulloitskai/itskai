# typed: strict
# frozen_string_literal: true

module Sources
  class RecordByGid < BaseSource
    sig do
      params(ids: T::Array[String])
        .returns(T::Array[T.nilable(ActiveRecord::Base)])
    end
    def fetch(ids)
      records = GlobalID::Locator.locate_many(ids, ignore_missing: true)
      records_by_gid = records.index_by { |r| r.to_gid.to_s }
      ids.map { |id| records_by_gid.fetch(id) }
    end
  end
end
