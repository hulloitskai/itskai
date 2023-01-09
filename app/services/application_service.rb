# typed: strict
# frozen_string_literal: true

class ApplicationService
  extend T::Sig
  extend T::Helpers

  # == Concerns
  include ActiveSupport::Configurable
  include Singleton
  include Logging

  # == Methods
  sig { returns(T::Boolean) }
  def enabled? = self.class.enabled?

  sig { returns(T::Boolean) }
  def disabled? = self.class.disabled?

  sig { overridable.returns(T::Boolean) }
  def ready? = true

  sig { overridable.void }
  def start; end
end

class ApplicationService
  class << self
    extend T::Sig
    extend T::Helpers

    # == Service
    sig { returns(T.nilable(T.attached_class)) }
    def start
      return if disabled?
      if !started? && Rails.const_defined?(:Server)
        puts "=> Initializing #{name}" # rubocop:disable Rails/Output
        started!
      end
      instance.tap(&:start)
    end
    alias_method :restart, :start

    sig { overridable.returns(T::Boolean) }
    def enabled? = true

    sig { returns(T::Boolean) }
    def disabled? = !enabled?

    sig { returns(T::Boolean) }
    def ready? = started? && enabled? && instance.ready?

    private

    sig { returns(T::Boolean) }
    def started?
      @started = T.let(@started, T.nilable(TrueClass))
      !!@started
    end

    sig { void }
    def started!
      @started = true
    end
  end
end
