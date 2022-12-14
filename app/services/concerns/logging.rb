# typed: strict
# frozen_string_literal: true

module Logging
  extend T::Sig
  extend T::Helpers

  requires_ancestor { Kernel }

  extend ActiveSupport::Concern

  class_methods do
    extend T::Sig

    sig { returns(ActiveSupport::Logger) }
    def logger = Rails.logger
  end

  sig { returns(ActiveSupport::Logger) }
  def logger = Rails.logger

  private

  sig { overridable.params(block: T.proc.void).void }
  def tag_logger(&block)
    logger = self.logger
    if logger.respond_to?(:tagged)
      logger = T.cast(logger, ActiveSupport::TaggedLogging)
      logger.tagged(self.class.name, &block)
    end
  end
end
