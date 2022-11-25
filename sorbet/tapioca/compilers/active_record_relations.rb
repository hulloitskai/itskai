# typed: ignore
# frozen_string_literal: true

require "tapioca/dsl/compilers/active_record_relations"

class Tapioca::Dsl::Compilers::ActiveRecordRelations
  module Extension
    include Tapioca::Dsl::Helpers::ActiveRecordConstantsHelper

    private

    def create_relation_class(model)
      superclass = "::ActiveRecord::Relation"
      model.create_class(
        RelationClassName,
        superclass_name: superclass,
      ) do |klass|
        klass.create_method("to_a", return_type: "T::Array[#{constant_name}]")
      end
      super
    end

    def create_association_relation_class(model)
      superclass = "::ActiveRecord::AssociationRelation"
      model.create_class(
        AssociationRelationClassName,
        superclass_name: superclass,
      ) do |klass|
        klass.create_method("to_a", return_type: "T::Array[#{constant_name}]")
      end
      super
    end

    def create_collection_proxy_class(model)
      superclass = "::ActiveRecord::Associations::CollectionProxy"
      model.create_class(
        AssociationsCollectionProxyClassName,
        superclass_name: superclass,
      ) do |klass|
        klass.create_method("to_a", return_type: "T::Array[#{constant_name}]")
      end
      super
    end
  end

  prepend Extension
end
