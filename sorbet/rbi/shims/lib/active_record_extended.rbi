# typed: strict

class ActiveRecord::Relation
  include ActiveRecordExtended::QueryMethods::WhereChain
end
