# typed: strict
# frozen_string_literal: true

module Slugged
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  included do
    T.bind(self, T.all(T.class_of(ApplicationRecord), ClassMethods))

    # == Dependencies
    requires_columns :slug
  end

  # == Class Methods
  class_methods do
    extend T::Sig

    sig { returns(Integer) }
    def generated_slug_length = @generated_slug_length || 16

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
