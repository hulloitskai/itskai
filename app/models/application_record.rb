# typed: strict
# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  class << self
    extend T::Sig

    private

    # == Helpers
    sig { params(column_names: T.any(Symbol, String)).void }
    def requires_columns(*column_names)
      unless Rails.const_defined?(:Server) || Rails.const_defined?(:Console)
        return
      end

      Kernel.suppress(ActiveRecord::ConnectionNotEstablished) do
        missing_columns = column_names.map(&:to_s) - self.column_names
        if missing_columns.present?
          subject =
            if missing_columns.count == 1
              "column `#{missing_columns.first}'"
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

class ApplicationRecord
  extend T::Sig

  primary_abstract_class

  # == Enumerize
  extend Enumerize

  # == Sorbet
  # Support runtime type-checking for Sorbet-generated types.
  PrivateRelation = ActiveRecord::Relation
  PrivateRelationWhereChain = ActiveRecord::Relation
  PrivateAssociationRelation = ActiveRecord::AssociationRelation
  PrivateAssociationRelationWhereChain = ActiveRecord::AssociationRelation
  PrivateCollectionProxy = ActiveRecord::Associations::CollectionProxy

  # == Scopes
  scope :chronological, -> { order(:created_at) }
  scope :reverse_chronological, -> { order(created_at: :desc) }

  # == Serialization
  sig { overridable.returns(T::Hash[String, T.untyped]) }
  def to_hash
    build_hash
  end

  sig { returns(T::Hash[String, T.untyped]) }
  def to_h
    to_hash
  end

  # == Pattern Matching
  sig do
    params(keys: T.nilable(T::Array[Symbol]))
      .returns(T::Hash[Symbol, T.untyped])
  end
  def deconstruct_keys(keys = [])
    serializable_hash(only: keys).symbolize_keys!
  end

  # == GraphQL
  sig { returns(InputFieldErrors) }
  def input_field_errors
    InputFieldErrors.from(errors)
  end

  private

  # == Helpers
  sig do
    params(hash: T.nilable(T::Hash[String, T.untyped]), options: T.untyped)
      .returns(T::Hash[String, T.untyped])
  end
  def build_hash(hash = nil, **options)
    default_options = { except: self.class.filter_attributes }
    options = default_options.deep_merge(options)
    hash = serializable_hash(options).with_indifferent_access
    hash.deep_merge!(hash) if hash.present?
    hash.compact_blank!
    hash
  end
end
