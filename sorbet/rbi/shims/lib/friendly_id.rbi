# typed: strict

module FriendlyId
  mixes_in_class_methods FriendlyId::Base
end

class ActiveRecord::Relation
  sig { returns(T.self_type) }
  def friendly; end
end
