# typed: strong

class Message
  sig { returns(T.nilable(Contactable)) }
  def sender; end

  sig { returns(T.nilable(Contactable)) }
  def recipient; end
end
