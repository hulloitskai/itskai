# typed: strict
# frozen_string_literal: true

class ApplicationService
  extend T::Sig
  extend T::Helpers

  # == Concerns
  include ActiveSupport::Configurable
  include Singleton
  include Logging

  # == Initialization
  sig { void }
  def initialize
    @started = T.let(false, T::Boolean)
  end

  # == Methods
  sig { returns(T::Boolean) }
  def enabled? = self.class.enabled?

  sig { returns(T::Boolean) }
  def disabled? = self.class.disabled?

  sig { returns(T::Boolean) }
  def started?
    @started
  end

  sig { overridable.returns(T::Boolean) }
  def ready?
    started?
  end

  sig { overridable.void }
  def start
    @started = true
  end
end

class ApplicationService
  class << self
    extend T::Sig
    extend T::Helpers

    # == Methods
    sig { returns(T.nilable(T.attached_class)) }
    def start
      return if disabled?
      if !started? && Rails.const_defined?(:Server)
        puts "=> Initializing #{name}" # rubocop:disable Rails/Output
      end
      instance.tap(&:start)
    end
    alias_method :restart, :start

    sig { overridable.returns(T::Boolean) }
    def enabled? = true

    sig { returns(T::Boolean) }
    def disabled? = !enabled?

    sig { returns(T::Boolean) }
    def started? = instance.started?

    sig { returns(T::Boolean) }
    def ready? = enabled? && instance.ready?
  end
end
