# typed: strong

class Post
  sig { returns(T.nilable(T.all(ApplicationRecord, Postable))) }
  def postable; end

  sig { returns(T.nilable(T.all(ApplicationRecord, ::Named))) }
  def author; end
end
