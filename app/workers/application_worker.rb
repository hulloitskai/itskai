# typed: strict
# frozen_string_literal: true

class ApplicationWorker
  extend T::Sig
  extend T::Helpers

  include Singleton
  include Logging

  abstract!

  # == Lifecycle
  sig { returns(T::Boolean) }
  def self.enabled?
    !ENV["#{env_prefix}_DISABLED"].truthy?
  end

  sig { abstract.void }
  def self.start; end

  sig { abstract.void }
  def self.stop; end

  # == Helpers
  sig { returns(String) }
  private_class_method def self.env_prefix
    @env_key ||= T.let(
      T.must(self.class.name).underscore.upcase,
      T.nilable(String),
    )
  end
end
