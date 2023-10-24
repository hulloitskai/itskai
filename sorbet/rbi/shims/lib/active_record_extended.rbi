# typed: strong

class ActiveRecord::Relation
  include ActiveRecordExtended::QueryMethods::AnyOf
  include ActiveRecordExtended::QueryMethods::Inet
  include ActiveRecordExtended::QueryMethods::WhereChain
end
