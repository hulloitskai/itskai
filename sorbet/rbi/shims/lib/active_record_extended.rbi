# typed: strong

class ActiveRecord::Relation
  include ActiveRecordExtended::WhereChain
end
