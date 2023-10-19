# typed: strict
# frozen_string_literal: true

require "sorbet-runtime"
require "rails"

module Logging
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { Kernel }

  class_methods do
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { Module }

    # == Methods
    sig { returns(ActiveSupport::Logger) }
    def logger = Rails.logger

    private

    # == Helpers
    sig { overridable.params(block: T.proc.void).void }
    def tag_logger(&block)
      logger = self.logger
      if logger.respond_to?(:tagged)
        logger = T.cast(logger, ActiveSupport::TaggedLogging)
        logger.tagged(name, &block)
      end
    end
  end

  # == Methods
  sig { returns(ActiveSupport::Logger) }
  def logger = Rails.logger

  # == Helpers
  sig { overridable.params(block: T.proc.void).void }
  def tag_logger(&block)
    logger = self.logger
    if logger.respond_to?(:tagged)
      logger = T.cast(logger, ActiveSupport::TaggedLogging)
      logger.tagged(self.class.name, &block)
    end
  end
end
