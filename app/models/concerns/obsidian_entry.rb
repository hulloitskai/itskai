# typed: strict
# frozen_string_literal: true

module ObsidianEntry
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
  end
end
