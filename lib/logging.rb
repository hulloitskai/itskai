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

    sig { overridable.params(tags: String, block: T.proc.void).void }
    def with_log_tags(*tags, &block)
      if logger.respond_to?(:tagged)
        tagged_logger = T.unsafe(logger)
        tagged_logger.tagged(*log_tags, *tags, &block)
      end
    end

    sig { overridable.returns(T::Array[String]) }
    def log_tags
      tags = T.let([], T::Array[String])
      if (name = self.name)
        tags << name
      end
      tags
    end
  end

  included do
    delegate :logger, to: :class
  end

  # == Methods
  sig do
    overridable.params(tags: String, block: T.proc.void).void
  end
  def with_log_tags(*tags, &block)
    if logger.respond_to?(:tagged)
      tagged_logger = T.unsafe(logger)
      tagged_logger.tagged(*log_tags, *tags, &block)
    end
  end

  sig { overridable.returns(T::Array[String]) }
  def log_tags
    self.class.log_tags
  end
end
