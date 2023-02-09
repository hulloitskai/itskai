# typed: strong

module FriendlyIdentifiable
  include FriendlyId::Model
  include FriendlyId::Base
  include FriendlyId::Reserved
  include FriendlyId::Slugged

  mixes_in_class_methods FriendlyId::Base
  mixes_in_class_methods FriendlyId::Reserved
  mixes_in_class_methods FriendlyId::Slugged
end
