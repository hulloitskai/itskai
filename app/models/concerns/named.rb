# typed: true
# frozen_string_literal: true

module Named
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ApplicationRecord }

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Configuration
    requires_columns :name

    # == Validations
    validates :name, presence: true, length: { maximum: 64 }
  end

  # == Interface
  sig { abstract.returns(::String) }
  def name; end

  sig { abstract.returns(T::Boolean) }
  def name?; end

  # == Methods
  sig { params(value: String).returns(String) }
  def name=(value)
    super(value.strip)
  end
end
