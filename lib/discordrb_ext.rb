# typed: true
# frozen_string_literal: true

require "discordrb"
require "rails"

module Discordrb
  class Logger
    module RailsLogging
      extend T::Sig
      extend T::Helpers

      requires_ancestor { Kernel }

      # == Methods
      # def debug, info, warn, error
      %i[debug info warn error].each do |mode|
        define_method(mode) do |message|
          T.bind(self, RailsLogging)
          if enabled_modes.include?(mode)
            with_log_tags do
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
            with_log_tags(mode.to_s) do
              logger.public_send(:info, message)
            end
          end
        end
      end

      # == Initializer
      def initialize(...)
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
      def with_log_tags(*tags, &block)
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
