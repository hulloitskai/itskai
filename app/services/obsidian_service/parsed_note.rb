# typed: true
# frozen_string_literal: true

class ObsidianService
  class ParsedNote < T::Struct
    const :meta, NoteMeta
    const :content, String
  end
end
