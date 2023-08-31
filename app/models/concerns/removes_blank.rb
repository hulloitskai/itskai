# typed: strict
# frozen_string_literal: true

module RemovesBlank
  extend T::Sig
  extend T::Helpers
  extend ActiveSupport::Concern

  # == Annotations
  requires_ancestor { ActiveRecord::Base }

  class_methods do
    extend T::Sig
    extend T::Helpers

    # == Annotations
    requires_ancestor { T.class_of(ActiveRecord::Base) }

    # == Helpers
    sig { params(attributes: T.any(Symbol, String)).void }
    def removes_blank(*attributes)
      # Sorbet segfaults if this method is used directly :'(
      public_send(:before_validation) do
        attributes.each do |column_name|
          value = send(column_name)
          send("#{column_name}=", value.presence)
        end
      end
    end
  end
end
