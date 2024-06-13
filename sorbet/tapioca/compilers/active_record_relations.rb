# typed: strict
# frozen_string_literal: true

require "tapioca/dsl/compilers/active_record_relations"

module Tapioca::Dsl::Compilers
  class ActiveRecordRelations
    module Extension
      extend T::Sig
      extend T::Helpers
      include Tapioca::Dsl::Helpers::ActiveRecordConstantsHelper

      requires_ancestor { ActiveRecordRelations }

      # == Methods
      sig { returns(T.class_of(ActiveRecord::Base)) }
      def constant = super

      private

      # == Helpers
      sig { returns(T.untyped) }
      def create_relation_class
        model.create_class(
          RelationClassName,
          superclass_name: "::ActiveRecord::Relation",
        ) do |klass|
          create_friendly_method(klass)
        end
        super
      end

      sig { returns(T.untyped) }
      def create_association_relation_class
        model.create_class(
          AssociationRelationClassName,
          superclass_name: "::ActiveRecord::AssociationRelation",
        ) do |klass|
          create_friendly_method(klass)
        end
        super
      end

      sig { returns(T.untyped) }
      def create_collection_proxy_class
        model.create_class(
          AssociationsCollectionProxyClassName,
          superclass_name: "::ActiveRecord::Associations::CollectionProxy",
        ) do |klass|
          create_friendly_method(klass)
        end
        super
      end

      sig { params(klass: T.untyped).returns(T.untyped) }
      def create_friendly_method(klass)
        if defined?(FriendlyId) && constant.is_a?(FriendlyId)
          klass.create_method("friendly", return_type: "T.self_type")
        end
      end
    end

    prepend Extension
  end
end
