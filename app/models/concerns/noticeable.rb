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
  sig { abstract.returns(String) }
  def notification_title; end

  sig { abstract.returns(String) }
  def notification_body; end

  sig { overridable.returns(T.nilable(ActiveStorage::Blob)) }
  def notification_icon_blob; end

  sig { overridable.returns(T.nilable(String)) }
  def notification_action_url; end
end
