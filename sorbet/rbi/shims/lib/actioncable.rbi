# typed: strong

module ActionCable
  module Connection::Authorization
    sig { returns(T.noreturn) }
    def reject_unauthorized_connection; end
  end

  class Channel::Base
    sig { returns(Connection::Base) }
    def connection; end
  end
end
