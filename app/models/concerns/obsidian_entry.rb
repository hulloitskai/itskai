# typed: strict
# frozen_string_literal: true

module ObsidianEntry
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  abstract!
  requires_ancestor { ApplicationRecord }

  included do
    T.bind(self, T.class_of(ApplicationRecord))

    # == Dependencies
    requires_columns :name

    # == Validations
    validates :name, presence: true
  end

  # == Methods
  sig { abstract.returns(String) }
  def title; end
end
