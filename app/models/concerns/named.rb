# typed: strict
# frozen_string_literal: true

module Named
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
      RequiresColumn::ClassMethods,
    ))

    # == Configuration
    requires_column :name

    # == Validations
    validates :name, length: { maximum: 64 }, presence: true
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
