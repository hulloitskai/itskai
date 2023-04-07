# typed: true
# frozen_string_literal: true

module Identifiable
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ApplicationRecord }

  # == Interface
  sig { abstract.returns(T.nilable(::String)) }
  def id; end

  sig { abstract.params(value: ::String).returns(::String) }
  def id=(value); end

  sig { abstract.returns(T::Boolean) }
  def id?; end

  # == Methods
  sig { returns(String) }
  def id!
    self.id ||= SecureRandom.uuid
  end
end
