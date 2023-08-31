# typed: strict
# frozen_string_literal: true

module RequiresColumn
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
    sig { params(column_names: T.any(Symbol, String)).void }
    def requires_column(*column_names)
      return unless Rails.server? || Rails.console?
      Kernel.suppress(ActiveRecord::ConnectionNotEstablished) do
        missing_columns = column_names.map(&:to_s) - self.column_names
        if missing_columns.present?
          subject = if missing_columns.count == 1
            "column `#{missing_columns.first!}'"
          else
            missing_columns_sentence =
              missing_columns.map { |name| "`#{name}'" }.to_sentence
            "columns #{missing_columns_sentence}"
          end
          raise "Missing #{subject} on #{model_name}"
        end
      end
    end
  end
end
