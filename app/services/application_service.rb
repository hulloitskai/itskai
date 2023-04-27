# typed: strict
# frozen_string_literal: true

class ApplicationService
  class << self
    extend T::Sig
    extend T::Helpers

    # == Methods
    sig { returns(T.nilable(T.attached_class)) }
    def start
      return if disabled?
      if !started? && Rails.server?
        puts "=> Initializing #{name}" # rubocop:disable Rails/Output
      end
      instance.tap(&:start)
    end

    sig { returns(T.nilable(T.attached_class)) }
    def stop = instance.tap(&:stop)

    sig { returns(T.nilable(T.attached_class)) }
    def restart = instance.tap(&:restart)

    sig { overridable.returns(T::Boolean) }
    def enabled? = true

    sig { returns(T::Boolean) }
    def disabled? = !enabled?

    sig { returns(T::Boolean) }
    def started? = instance.started?

    sig { returns(T::Boolean) }
    def ready? = enabled? && instance.ready?

    # == Helpers
    sig do
      type_parameters(:U).params(
        block: T.proc.returns(T.type_parameter((:U))),
      ).returns(T.type_parameter((:U)))
    end
    def checked(&block)
      raise "#{name} is disabled" if disabled?
      raise "#{name} is not ready" unless ready?
      yield
    end
  end

  extend T::Sig
  extend T::Helpers

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

  sig { overridable.void }
  def stop
    @started = false
  end

  sig { void }
  def restart
    stop
    start
  end
end
