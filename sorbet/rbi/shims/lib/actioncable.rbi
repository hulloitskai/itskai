# typed: strong

module ActionCable::Connection::Authorization
  sig { returns(T.noreturn) }
  def reject_unauthorized_connection; end
end
