# typed: strict
# frozen_string_literal: true

require "discordrb"
require "rails"

module Discordrb
  class Logger
    module RailsLogging
      extend T::Sig
      extend T::Helpers

      # == Annotations
      requires_ancestor { Kernel }

      # == Methods
      # def debug, info, warn, error
      %i[debug info warn error].each do |mode|
        define_method(mode) do |message|
          T.bind(self, RailsLogging)
          if enabled_modes.include?(mode)
            tag_logger do
              logger.public_send(mode, message)
            end
          end
        end
      end

      # def good, out, in, ratelimit
      %i[good out in ratelimit].each do |mode|
        define_method(mode) do |message|
          T.bind(self, RailsLogging)
          if enabled_modes.include?(mode)
            tag_logger(mode.to_s) do
              logger.public_send(:info, message)
            end
          end
        end
      end

      # == Initializer
      sig { params(args: T.untyped, kwargs: T.untyped).void }
      def initialize(*args, **kwargs)
        super
        @enabled_modes = T.let(@enabled_modes, T::Array[Symbol])
      end

      # == Methods
      sig { params(e: Exception).void }
      def log_exception(e)
        public_send(:error, e.to_s)
      end

      private

      # == Attributes
      sig { returns(T::Array[Symbol]) }
      attr_reader :enabled_modes

      # == Helpers
      sig { returns(ActiveSupport::Logger) }
      def logger = Rails.logger

      sig { overridable.params(tags: String, block: T.proc.void).void }
      def tag_logger(*tags, &block)
        tags.prepend("Discordrb")
        logger = self.logger
        if logger.respond_to?(:tagged)
          logger = T.cast(logger, ActiveSupport::TaggedLogging)
          logger.tagged(*T.unsafe(tags), &block)
        end
      end
    end

    prepend RailsLogging
  end
end
