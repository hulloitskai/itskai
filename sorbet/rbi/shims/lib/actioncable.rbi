# typed: strong

module ActionCable
  module Connection::Authorization
    sig { returns(T.noreturn) }
    def reject_unauthorized_connection; end
  end

  class Channel::Base
    sig { returns(Connection::Base) }
    def connection; end

    # sig { returns(ActionController::Parameters)}
    # def params; end
  end

  sig { returns(Server::Base) }
  def self.server; end
end
