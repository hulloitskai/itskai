# typed: true
# frozen_string_literal: true

class ObsidianService
  class NoteMeta < T::Struct
    const :modified_at, ActiveSupport::TimeWithZone
    const :published, T::Boolean
    const :hidden, T::Boolean
    const :title, T.nilable(String)
    const :slug, T.nilable(String)
    const :aliases, T::Array[String]
    const :tags, T::Array[String]
    const :blurb, T.nilable(String)
  end
end
