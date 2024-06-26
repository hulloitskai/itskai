# typed: true
# frozen_string_literal: true

require "sorbet-runtime"
require "rails"

module Logging
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  requires_ancestor { Kernel }

  class_methods do
    extend T::Sig
    extend T::Helpers

    requires_ancestor { Module }

    # == Methods
    sig do
      returns(T.any(ActiveSupport::Logger, ActiveSupport::BroadcastLogger))
    end
    def logger = Rails.logger

    sig { overridable.params(block: T.proc.void).void }
    def with_log_tags(&block)
      logger = self.logger
      if logger.respond_to?(:tagged)
        logger.public_send(:tagged, name, &block)
      end
    end
  end

  included do
    delegate :logger, :with_log_tags, to: :class
  end
end
