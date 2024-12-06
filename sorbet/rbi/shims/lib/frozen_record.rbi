# typed: true

class FrozenRecord::Base
  sig { params(id: T.untyped).returns(T.attached_class) }
  def self.find(id); end
end
