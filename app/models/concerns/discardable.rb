# typed: true
# frozen_string_literal: true

module Discardable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern
  include Discard::Model

  # == Annotations
  abstract!
  requires_ancestor { ApplicationRecord }

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Configuration
    requires_columns :discarded_at
  end

  # == Interface
  sig { abstract.returns(T.nilable(::ActiveSupport::TimeWithZone)) }
  def discarded_at; end

  sig do
    abstract.params(
      value: T.nilable(::ActiveSupport::TimeWithZone),
    ).returns(T.nilable(::ActiveSupport::TimeWithZone))
  end
  def discarded_at=(value); end

  sig { abstract.returns(T::Boolean) }
  def discarded_at?; end
end
