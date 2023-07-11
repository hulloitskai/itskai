# typed: strong

class JournalEntry
  sig { params(query: String).returns(PrivateRelation) }
  def search(query); end

  module CommonRelationMethods
    sig do params(query: String).returns(PrivateRelation) end
    def search(query); end
  end
end
