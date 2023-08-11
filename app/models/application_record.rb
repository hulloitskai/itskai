# typed: strict
# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  extend T::Sig
  extend T::Helpers
  extend Enumerize
  include Routing
  include Logging

  # == Constants
  # Support runtime type-checking for Sorbet-generated types.
  PrivateRelation = ActiveRecord::Relation
  PrivateRelationWhereChain = ActiveRecord::Relation
  PrivateAssociationRelation = ActiveRecord::AssociationRelation
  PrivateAssociationRelationWhereChain = ActiveRecord::AssociationRelation
  PrivateCollectionProxy = ActiveRecord::Associations::CollectionProxy

  # == Configuration
  primary_abstract_class

  # == Scopes
  scope :chronological, -> { order(:created_at) }
  scope :reverse_chronological, -> { order(created_at: :desc) }

  # == Conversions
  sig { overridable.returns(T::Hash[T.any(Symbol, String), T.untyped]) }
  def to_hash = build_hash

  sig { returns(T::Hash[T.any(Symbol, String), T.untyped]) }
  def to_h = to_hash

  # == Pattern Matching
  sig do
    params(keys: T.nilable(T::Array[Symbol]))
      .returns(T::Hash[Symbol, T.untyped])
  end
  def deconstruct_keys(keys)
    serializable_hash(only: keys || []).symbolize_keys!
  end

  # == GraphQL
  sig { returns(InputFieldErrors) }
  def input_field_errors = InputFieldErrors.from(errors)

  private

  # == Conversions: Helpers
  sig do
    params(options: T.untyped)
      .returns(T::Hash[T.any(Symbol, String), T.untyped])
  end
  def build_hash(**options)
    default_options = { except: self.class.filter_attributes }
    options = default_options.deep_merge(options)
    hash = serializable_hash(options).with_indifferent_access
    hash.deep_merge!(hash) if hash.present?
    hash.compact_blank!
    hash
  end

  class << self
    extend T::Sig
    extend T::Helpers

    private

    # == Helpers
    sig { params(column_names: T.any(Symbol, String)).void }
    def requires_columns(*column_names)
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

    sig { params(column_names: T.any(Symbol, String)).void }
    def removes_blanks(*column_names)
      before_validation do
        column_names.each do |column_name|
          value = send(column_name)
          send("#{column_name}=", value.presence)
        end
      end
    end
  end
end
