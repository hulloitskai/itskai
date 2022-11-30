# typed: strict
# frozen_string_literal: true

module Slugged
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  class_methods do
    extend T::Sig

    sig { returns(Integer) }
    def slug_length
      @slug_length || 16
    end

    sig { params(size: Integer).returns(Integer) }
    def slug_length=(size)
      @slug_length = T.let(@slug_length, T.nilable(Integer))
      @slug_length = size
    end

    sig { returns(String) }
    def generate_slug
      Nanoid.generate(
        alphabet:
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        size: slug_length,
      )
    end
  end

  # == Attributes
  sig { returns(String) }
  def slug!
    self.slug ||= generate_slug
  end

  private

  # == Helpers
  sig { returns(String) }
  def generate_slug
    T.cast(self.class, ClassMethods).generate_slug
  end
end
