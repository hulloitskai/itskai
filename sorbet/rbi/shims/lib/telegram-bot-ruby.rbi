# typed: strong

module Telegram::Bot
  class Client
    sig { params(block: T.proc.params(message: Types::Message).void).void }
    def listen(&block); end
  end
end
