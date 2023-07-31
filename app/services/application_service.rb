# typed: strict
# frozen_string_literal: true

class ApplicationService
  extend T::Sig
  extend T::Helpers
  include ActiveSupport::Configurable
  include Singleton
  include Logging

  class << self
    extend T::Sig
    extend T::Helpers

    # == Class methods
    sig { returns(String) }
    def service_name
      @service_name = T.let(@service_name, T.nilable(String))
      @service_name ||= T.must(name).delete_suffix("Service").underscore
    end

    sig { returns(T.nilable(T.attached_class)) }
    def start
      if Rails.server?
        if disabled?
          puts "=> Skipping #{name} initialization (disabled)" # rubocop:disable Rails/Output, Layout/LineLength
        elsif !started?
          puts "=> Initializing #{name}" # rubocop:disable Rails/Output
        end
      end
      unless disabled?
        instance.tap(&:start)
      end
    end

    sig { returns(T.nilable(T.attached_class)) }
    def stop = instance.tap(&:stop)

    sig { returns(T.nilable(T.attached_class)) }
    def restart = instance.tap(&:restart)

    sig { overridable.returns(T::Boolean) }
    def disabled?
      setting("DISABLED").truthy?
    end

    sig { returns(T::Boolean) }
    def debug?
      setting("DEBUG").truthy?
    end

    sig { returns(T::Boolean) }
    def enabled? = !disabled?

    sig { returns(T::Boolean) }
    def started? = instance.started?

    sig { returns(T::Boolean) }
    def ready? = enabled? && instance.ready?

    private

    # == Class helpers
    sig { params(name: String).returns(T.nilable(String)) }
    def setting(name)
      ENV["#{service_name.upcase}_#{name}"]
    end

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

  # == Initialization
  sig { void }
  def initialize
    @started = T.let(false, T::Boolean)
  end

  # == Lifecycle
  sig { returns(T::Boolean) }
  def enabled? = self.class.enabled?

  sig { returns(T::Boolean) }
  def disabled? = self.class.disabled?

  sig { returns(T::Boolean) }
  def debug? = self.class.debug?

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

  private

  # == Helpers
  sig { returns(String) }
  def service_name = self.class.service_name

  sig do
    type_parameters(:U)
      .params(block: T.proc.returns(T.type_parameter(:U)))
      .returns(T.type_parameter(:U))
  end
  def silence_logger_in_console(&block)
    if Rails.console?
      Rails.logger.silence(&block)
    else
      yield
    end
  end
end
