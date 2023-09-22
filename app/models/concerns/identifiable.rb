# typed: strict
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
    id or raise "Missing ID"
  end

  sig { returns(String) }
  def saved_id!
    id || scoped do
      save!
      T.must(id)
    end
  end
end
