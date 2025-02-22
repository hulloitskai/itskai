# typed: strict
# frozen_string_literal: true

module Noticeable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  abstract!
  requires_ancestor { ActiveRecord::Base }

  included do
    T.bind(self, T.class_of(ActiveRecord::Base))

    has_one :notification, as: :noticeable, touch: true, dependent: :destroy
  end

  # == Interface
  sig do
    abstract
      .params(recipient: T.nilable(Friend))
      .returns(T::Hash[String, T.untyped])
  end
  def notification_payload(recipient); end
end
