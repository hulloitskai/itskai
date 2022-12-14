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
  sig { overridable.returns(T::Boolean) }
  def ready?
    false
  end
end

class ApplicationService
  class << self
    extend T::Sig
    extend T::Helpers

    sig { returns(T.attached_class) }
    def start
      if Rails.const_defined?(:Server)
        puts "=> Initializing #{name}" # rubocop:disable Rails/Output
      end
      instance
    end

    sig { returns(T::Boolean) }
    def ready?
      instance.ready?
    end
  end
end
