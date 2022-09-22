# typed: strong

class Membership
  sig { returns(T.nilable(T.all(ApplicationRecord, Grouplike, ::Named))) }
  def grouplike; end
end
