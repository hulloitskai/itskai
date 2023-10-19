# typed: strict
# frozen_string_literal: true

require "inertia_rails_ext/controller"
require "inertia_rails_ext/engine"
require "inertia_rails_ext/renderer"
require "inertia_rails_ext/mailer"
require "inertia_rails_ext/helper"

module InertiaRails
  extend T::Sig

  # == Accessors
  thread_mattr_accessor :threadsafe_page

  # == Methods
  sig { returns(T.nilable(T::Hash[Symbol, T.untyped])) }
  def self.page
    threadsafe_page
  end

  sig do
    params(page: T.nilable(T::Hash[Symbol, T.untyped]))
      .returns(T.nilable(T::Hash[Symbol, T.untyped]))
  end
  def self.page=(page)
    self.threadsafe_page = page
  end

  class << self
    # == Extension
    module Extension
      extend T::Sig
      extend T::Helpers

      # == Annotations
      requires_ancestor { T.class_of(InertiaRails) }

      # == Methods
      sig { void }
      def reset!
        super
        self.threadsafe_page = nil
      end
    end

    prepend Extension
  end
end
