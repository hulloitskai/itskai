# typed: strict
# frozen_string_literal: true

require "logging"

class ApplicationRecord < ActiveRecord::Base
  extend T::Sig
  extend T::Helpers
  extend Enumerize

  include RequiresColumn
  include RemovesBlank
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
end
