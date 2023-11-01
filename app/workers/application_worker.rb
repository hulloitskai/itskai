# typed: strict
# frozen_string_literal: true

require "logging"

class ApplicationWorker
  extend T::Sig
  extend T::Helpers

  include Singleton
  include Logging

  # == Annotations
  abstract!

  # == Lifecycle
  sig { abstract.void }
  def start; end

  sig { void }
  def self.start = instance.start

  sig { overridable.void }
  def stop; end

  sig { void }
  def self.stop = instance.stop
end
