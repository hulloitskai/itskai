# typed: strong

module FriendlyId
  mixes_in_class_methods FriendlyId::Base
  mixes_in_class_methods FriendlyId::Reserved
  mixes_in_class_methods FriendlyId::Slugged
end

class ActiveRecord::Relation
  sig { returns(T.self_type) }
  def friendly; end
end
