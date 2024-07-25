# typed: true
# frozen_string_literal: true

class NotionJournalEntrySyncResults < T::Struct
  # == Properties
  const :added, Integer
  const :updated, Integer
  const :removed, Integer
end
