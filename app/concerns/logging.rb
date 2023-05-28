# typed: strict
# frozen_string_literal: true

module Logging
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { Kernel }

  class_methods do
    extend T::Sig

    # == Class Methods
    sig { returns(ActiveSupport::Logger) }
    def logger = Rails.logger
  end

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
      logger.tagged(self.class.name, &block)
    end
  end
end
