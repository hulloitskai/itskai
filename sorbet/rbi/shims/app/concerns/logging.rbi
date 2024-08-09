# typed: strong

module Logging
  sig { returns(T.any(ActiveSupport::Logger, ActiveSupport::BroadcastLogger)) }
  def logger; end

  sig { params(tags: String, block: T.proc.void).void }
  def with_log_tags(*tags, &block); end
end
