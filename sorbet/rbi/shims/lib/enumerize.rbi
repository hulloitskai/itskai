# typed: strong

module Enumerize
  include Base::ClassMethods
  include Base::ClassMethods::Hook
  include Predicates
  include ActiveModelAttributesSupport
  include ActiveRecordSupport
  include Scope::ActiveRecord
  include ModuleAttributes
end
