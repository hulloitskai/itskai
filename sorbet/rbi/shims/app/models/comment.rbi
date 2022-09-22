# typed: strong

class Comment
  sig { returns(T.nilable(T.all(ApplicationRecord, Commentable, Routable))) }
  def commentable; end

  sig { returns(T.nilable(T.all(ApplicationRecord, ::Named))) }
  def author; end
end
