# typed: strict
# frozen_string_literal: true

module Slugged
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ActiveRecord::Base }
  requires_ancestor { RequiresColumn }

  included do
    T.bind(self, T.all(
      T.class_of(ActiveRecord::Base),
      ClassMethods,
      RequiresColumn::ClassMethods,
    ))

    # == Configuration
    requires_column :slug
    class_attribute :generated_slug_length, default: 16
  end

  class_methods do
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { T.class_of(ActiveRecord::Base) }

    # == Methods
    sig { returns(String) }
    def generate_slug
      Nanoid.generate(
        alphabet:
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        size: generated_slug_length,
      )
    end
  end

  # == Interface
  sig { abstract.returns(::String) }
  def slug; end

  sig { abstract.params(value: ::String).returns(::String) }
  def slug=(value); end

  sig { abstract.returns(T::Boolean) }
  def slug?; end

  # == Methods
  sig { returns(String) }
  def generate_slug
    self[:slug] ||= scoped do
      klass = T.cast(self.class, ClassMethods)
      klass.generate_slug
    end
  end

  sig { returns(String) }
  def generate_slug!
    self.slug = generate_slug
  end

  sig { void }
  def clear_slug
    self[:slug] = nil
  end
end
