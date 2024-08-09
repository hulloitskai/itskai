# typed: strict
# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  extend T::Sig
  extend T::Helpers
  extend Enumerize

  include RequiresColumn
  include RemovesBlank
  include Routing
  include Logging
  include FormErrors

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

  # == Pattern matching
  sig do
    params(keys: T.nilable(T::Array[Symbol]))
      .returns(T::Hash[Symbol, T.untyped])
  end
  def deconstruct_keys(keys)
    serializable_hash(only: keys || []).symbolize_keys!
  end

  # == Logging
  sig { override.returns(T::Array[String]) }
  def log_tags
    tags = super
    if (id = self.id)
      tags << id
    end
    tags
  end
end
