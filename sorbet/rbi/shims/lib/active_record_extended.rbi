# typed: strict

class ActiveRecord::Relation
  include ActiveRecordExtended::WhereChain
end
