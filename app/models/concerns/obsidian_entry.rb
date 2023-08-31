# typed: strict
# frozen_string_literal: true

module ObsidianEntry
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ActiveRecord::Base }
  requires_ancestor { RequiresColumns }

  included do
    T.bind(self, T.all(T.class_of(ActiveRecord::Base),
                       RequiresColumns::ClassMethods))

    # == Dependencies
    requires_columns :name

    # == Validations
    validates :name, presence: true
  end

  # == Interface
  sig { abstract.returns(::String) }
  def name; end

  sig { abstract.params(value: ::String).returns(::String) }
  def name=(value); end

  sig { abstract.returns(T::Boolean) }
  def name?; end

  sig { abstract.returns(String) }
  def title; end
end
