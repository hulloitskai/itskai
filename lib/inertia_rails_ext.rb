# typed: true
# frozen_string_literal: true

require "inertia_rails"
require_relative "inertia_rails_ext/engine"
require_relative "inertia_rails_ext/controller"
require_relative "inertia_rails_ext/renderer"
require_relative "inertia_rails_ext/mailer"
require_relative "inertia_rails_ext/middleware"

module InertiaRails
  extend T::Sig

  # == Accessors
  thread_mattr_accessor :threadsafe_page

  # == Methods
  sig { returns(T.nilable(T::Hash[Symbol, T.untyped])) }
  def self.page = threadsafe_page

  sig do
    params(page: T.nilable(T::Hash[Symbol, T.untyped]))
      .returns(T.nilable(T::Hash[Symbol, T.untyped]))
  end
  def self.page=(page)
    self.threadsafe_page = page
  end

  class << self
    # Clear threadsafe page when resetting.
    module ClearPageOnReset
      extend T::Sig
      extend T::Helpers

      requires_ancestor { T.class_of(InertiaRails) }

      # == Methods
      def reset!
        super
        self.threadsafe_page = nil
      end
    end
    prepend ClearPageOnReset
  end
end
