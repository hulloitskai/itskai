# typed: strong

class Reaction
  sig { returns(T.nilable(T.all(ApplicationRecord, Reactable))) }
  def reactable; end
end
