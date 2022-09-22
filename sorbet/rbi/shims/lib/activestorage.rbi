# typed: strong

class ActiveStorage::Blob
  sig { returns(ActiveStorage::Filename) }
  def filename; end
end

class ActiveRecord::Base
  include ActiveStorage::Attached::Model
end
