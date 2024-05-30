# typed: strong

class ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  include Geocoder::Store::ActiveRecord
end

module Geocoder
  sig do
    params(query: String, options: T::Hash[Symbol, T.untyped]).
      returns(T::Array[T.all(Result, Result::Base)])
  end
  def self.search(query, options = {}); end

  module Model::ActiveRecord
    has_attached_class!

    sig do
      params(
        address_attr: Symbol,
        options: T.untyped,
        block: T.nilable(
          T.proc.params(
            record: T.attached_class,
            results: T::Array[T.all(Result, Result::Base)],
          ).void,
        ),
      ).void
    end
    def geocoded_by(address_attr, options = T.unsafe(nil), &block); end

    sig do
      params(
        latitude_attr: Symbol,
        longitude_attr: Symbol,
        options: T.untyped,
        block: T.nilable(
          T.proc.params(
            record: T.attached_class,
            results: T::Array[T.all(Result, Result::Base)],
          ).void,
        ),
      ).void
    end
    def reverse_geocoded_by(
      latitude_attr,
      longitude_attr,
      options = T.unsafe(nil),
      &block
    ); end
  end
end
