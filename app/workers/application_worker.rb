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
  sig { returns(T::Boolean) }
  def self.enabled?
    ENV["#{env_prefix}_ENABLED"].present?
  end

  sig { abstract.void }
  def start; end

  sig { void }
  def self.start = instance.start

  sig { overridable.void }
  def stop; end

  sig { void }
  def self.stop = instance.stop

  # == Helpers
  sig { returns(String) }
  private_class_method def self.env_prefix
    @env_key ||= T.let(
      T.must(self.class.name).underscore.upcase,
      T.nilable(String),
    )
  end
end
