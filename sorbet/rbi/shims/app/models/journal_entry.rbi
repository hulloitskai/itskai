# typed: strong

class JournalEntry
  sig { params(query: String).returns(PrivateRelation) }
  def search(query); end

  module CommonRelationMethods
    sig { params(query: String).returns(PrivateRelation) }
    def search(query); end
  end
end
