# typed: strict
# frozen_string_literal: true

module Named
  extend T::Sig
  extend T::Helpers

  abstract!
  requires_ancestor { ApplicationRecord }

  extend ActiveSupport::Concern

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Dependencies
    requires_columns :name

    # == Validations
    validates :name, presence: true
    validates :name,
              length: {
                maximum: 64,
              },
              unless: -> {
                T.bind(self, Named)
                new_record? && try(:imported?)
              }
  end

  # == Setters
  sig { params(value: String).returns(String) }
  def name=(value)
    super(value.strip)
  end
end
