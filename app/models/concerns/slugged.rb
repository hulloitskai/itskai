# typed: strict
# frozen_string_literal: true

module Slugged
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ApplicationRecord }

  included do
    T.bind(self, T.all(T.class_of(ApplicationRecord), ClassMethods))

    # == Configuration
    requires_columns :slug
  end

  class_methods do
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { T.class_of(ApplicationRecord) }

    # == Methods
    sig { returns(Integer) }
    def generated_slug_length
      @generated_slug_length || 16
    end

    sig { params(size: Integer).returns(Integer) }
    def generated_slug_length=(size)
      @generated_slug_length = T.let(@generated_slug_length, T.nilable(Integer))
      @generated_slug_length = size
    end

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
    self[:slug] ||= T.cast(self.class, ClassMethods).generate_slug
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
