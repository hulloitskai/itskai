# typed: ignore

class ActiveRecord::Relation
  include ActiveRecordExtended::WhereChain
end
