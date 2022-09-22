# typed: strong

module ActiveRecord
  class Base
    include Kaminari::ActiveRecordModelExtension

    sig { params(num: T.untyped).returns(Relation) }
    def self.page(num = T.unsafe(nil)); end
  end

  class Relation
    include Kaminari::PageScopeMethods

    sig { params(num: T.untyped).returns(T.self_type) }
    def page(num = T.unsafe(nil)); end
  end
end
