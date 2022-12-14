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
    if Rails.const_defined?(:Server)
      puts "=> Initializing #{self.class.name}" # rubocop:disable Rails/Output
    end
  end

  # == Methods
  sig { overridable.returns(T::Boolean) }
  def ready?
    false
  end
end

class ApplicationService
  class << self
    extend T::Sig
    extend T::Helpers

    alias_method :start, :instance

    sig { returns(T::Boolean) }
    def ready?
      instance.ready?
    end
  end
end
