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
end

class ApplicationService
  class << self
    extend T::Sig
    extend T::Helpers

    # == Service
    sig { returns(T.nilable(T.attached_class)) }
    def start
      return if disabled?
      if Rails.const_defined?(:Server)
        puts "=> Initializing #{name}" # rubocop:disable Rails/Output
      end
      instance
    end

    sig { overridable.returns(T::Boolean) }
    def enabled? = true

    sig { returns(T::Boolean) }
    def disabled? = !enabled?

    sig { returns(T::Boolean) }
    def ready? = enabled? && instance.ready?
  end
end
