# typed: strong

module ActiveRecord
  class Base
    sig { params(block: T.untyped).returns(ActiveModel::Name) }
    def model_name(&block); end
  end

  module Calculations
    sig {returns(T::Array[String])}
    def ids; end
  end

  # Method definitions are documented here:
  # https://api.rubyonrails.org/v7.0/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html
  class Migration::Current
    # == Tables
    # https://github.com/rails/rails/blob/v7.0.0.alpha2/activerecord/lib/active_record/connection_adapters/abstract/schema_statements.rb#L154-L295
    sig do
      params(
        table_name: T.any(String, Symbol),
        comment: T.untyped,
        id: T.any(T::Boolean, Symbol),
        primary_key: T.any(String, Symbol, T::Array[T.any(String, Symbol)]),
        options: T.untyped,
        temporary: T::Boolean,
        force: T.any(T::Boolean, Symbol),
        if_not_exists: T::Boolean,
        as: T.untyped,
        blk: T.nilable(
          T.proc.params(t: ConnectionAdapters::PostGIS::TableDefinition).void,
        ),
      ).void
    end
    def create_table(
      table_name,
      comment: nil,
      id: :primary_key,
      primary_key: :_,
      options: nil,
      temporary: false,
      force: false,
      if_not_exists: false,
      as: nil,
      &blk
    ); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        bulk: T::Boolean,
        blk: T.proc.params(t: ConnectionAdapters::PostgreSQL::Table).void,
      ).void
    end
    def change_table(table_name, bulk: false, &blk); end

    sig do
      params(table_name: T.any(String, Symbol), new_name: T.any(String, Symbol))
        .void
    end
    def rename_table(table_name, new_name); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        force: T.any(T::Boolean, Symbol),
        if_exists: T::Boolean,
        blk: T.nilable(
          T.proc.params(t: ConnectionAdapters::PostGIS::TableDefinition).void,
        ),
      ).void
    end
    def drop_table(table_name, force: false, if_exists: false, &blk); end

    # == Join Tables
    sig do
      params(
        table_1: T.any(String, Symbol),
        table_2: T.any(String, Symbol),
        column_options: T.untyped,
        table_name: T.any(String, Symbol),
        temporary: T.untyped,
        force: T::Boolean,
        blk: T.nilable(
          T.proc.params(t: ConnectionAdapters::PostGIS::TableDefinition).void,
        ),
      ).void
    end
    def create_join_table(
      table_1,
      table_2,
      column_options: {},
      table_name: nil,
      temporary: nil,
      force: false,
      &blk
    ); end

    sig do
      params(
        table_1: T.any(String, Symbol),
        table_2: T.any(String, Symbol),
        options: T.untyped,
        blk: T.nilable(
          T.proc.params(t: ConnectionAdapters::PostGIS::TableDefinition).void,
        ),
      ).void
    end
    def drop_join_table(table_1, table_2, options = {}, &blk); end

    # == Columns
    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        type: T.any(String, Symbol),
        limit: T.untyped,
        default: T.untyped,
        null: T::Boolean,
        precision: Integer,
        scale: Integer,
        comment: String,
        array: T::Boolean,
        kwargs: T.untyped,
      ).void
    end
    def add_column(
      table_name,
      column_name,
      type,
      limit: nil,
      default: nil,
      null: nil,
      precision: nil,
      scale: nil,
      comment: nil,
      array: nil,
      **kwargs
    ); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        type: T.any(String, Symbol),
        limit: T.untyped,
        default: T.untyped,
        null: T::Boolean,
        precision: Integer,
        scale: Integer,
        comment: String,
        kwargs: T.untyped,
      ).void
    end
    def change_column(
      table_name,
      column_name,
      type,
      limit: nil,
      default: nil,
      null: nil,
      precision: nil,
      scale: nil,
      comment: nil,
      **kwargs
    ); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        null: T::Boolean,
        default: T.untyped,
      ).void
    end
    def change_column_null(table_name, column_name, null, default = nil); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        default_or_changes: T.untyped,
      ).void
    end
    def change_column_default(table_name, column_name, default_or_changes); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        new_column_name: T.any(String, Symbol),
      ).void
    end
    def rename_column(table_name, column_name, new_column_name); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        type: T.nilable(T.any(String, Symbol)),
        options: T.untyped,
      ).void
    end
    def remove_column(table_name, column_name, type = nil, options = {}); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_names: T.any(String, Symbol),
      ).void
    end
    def remove_columns(table_name, *column_names); end

    # Foreign Keys

    sig do
      params(
        from_table: T.any(String, Symbol),
        to_table: T.any(String, Symbol),
        column: T.any(String, Symbol),
        primary_key: T.any(String, Symbol),
        name: T.any(String, Symbol),
        on_delete: Symbol,
        on_update: Symbol,
        validate: T::Boolean,
      ).void
    end
    def add_foreign_key(
      from_table,
      to_table,
      column: nil,
      primary_key: nil,
      name: nil,
      on_delete: nil,
      on_update: nil,
      validate: true
    ); end

    sig do
      params(
        from_table: T.any(String, Symbol),
        to_table: T.nilable(T.any(String, Symbol)),
        column: T.any(String, Symbol),
        primary_key: T.any(String, Symbol),
        name: T.any(String, Symbol),
        on_delete: Symbol,
        on_update: Symbol,
        validate: T::Boolean,
      ).void
    end
    def remove_foreign_key(
      from_table,
      to_table = nil,
      column: nil,
      primary_key: nil,
      name: nil,
      on_delete: nil,
      on_update: nil,
      validate: true
    ); end

    sig do
      params(
        from_table: T.any(String, Symbol),
        to_table: T.any(String, Symbol),
        name: T.any(String, Symbol),
        column: T.any(String, Symbol),
        options: T.untyped,
      )
        .returns(T::Boolean)
    end
    def foreign_key_exists?(
      from_table,
      to_table = nil,
      name: nil,
      column: nil,
      **options
    ); end

    sig do
      params(table_name: T.any(String, Symbol)).returns(T::Array[T.untyped])
    end
    def foreign_keys(table_name); end

    # == Indices
    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol, T::Array[T.any(String, Symbol)]),
        using: T.untyped,
        unique: T::Boolean,
        where: T.untyped,
        order: T.untyped,
        name: T.any(String, Symbol),
        length: T.untyped,
        opclass: T.untyped,
        type: T.untyped,
        internal: T.untyped,
        algorithm: T.untyped,
      ).void
    end
    def add_index(
      table_name,
      column_name,
      using: nil,
      unique: false,
      where: nil,
      order: nil,
      name: nil,
      length: nil,
      opclass: nil,
      type: nil,
      internal: nil,
      algorithm: nil
    ); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column: T.any(String, Symbol, T::Array[T.any(String, Symbol)]),
        using: T.untyped,
        unique: T::Boolean,
        where: T.untyped,
        order: T.untyped,
        name: T.any(String, Symbol),
        length: T.untyped,
        opclass: T.untyped,
        type: T.untyped,
        internal: T.untyped,
        algorithm: T.untyped,
      ).void
    end
    def remove_index(
      table_name,
      column,
      using: nil,
      unique: false,
      where: nil,
      order: nil,
      name: nil,
      length: nil,
      opclass: nil,
      type: nil,
      internal: nil,
      algorithm: nil
    ); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        old_name: T.any(String, Symbol),
        new_name: T.any(String, Symbol),
      ).void
    end
    def rename_index(table_name, old_name, new_name); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol, T::Array[T.any(String, Symbol)]),
        options: T.untyped,
      )
        .returns(T::Boolean)
    end
    def index_exists?(table_name, column_name, options = {}); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        index_name: T.any(String, Symbol),
      ).returns(T::Boolean)
    end
    def index_name_exists?(table_name, index_name); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        column_name: T.any(String, Symbol),
        type: T.nilable(Symbol),
        options: T.untyped,
      ).returns(T::Boolean)
    end
    def column_exists?(table_name, column_name, type = nil, options = {}); end

    sig do
      params(table_name: T.any(String, Symbol)).returns(T::Array[T.untyped])
    end
    def indexes(table_name); end

    # References

    sig do
      params(
        table_name: T.any(String, Symbol),
        ref_name: T.any(String, Symbol),
        type: T.any(String, Symbol),
        index: T.any(T::Boolean, T::Hash[Symbol, T.untyped]),
        foreign_key: T.any(T::Boolean, T::Hash[Symbol, T.untyped]),
        polymorphic: T::Boolean,
        null: T.untyped,
      ).void
    end
    def add_reference(
      table_name,
      ref_name,
      type: :bigint,
      index: true,
      foreign_key: false,
      polymorphic: false,
      null: nil
    ); end

    sig do
      params(
        table_name: T.any(String, Symbol),
        ref_name: T.any(String, Symbol),
        type: T.any(String, Symbol),
        index: T.any(T::Boolean, T::Hash[Symbol, T.untyped]),
        foreign_key: T.any(T::Boolean, T::Hash[Symbol, T.untyped]),
        polymorphic: T::Boolean,
        null: T.untyped,
      ).void
    end
    def remove_reference(
      table_name,
      ref_name,
      type: :bigint,
      index: true,
      foreign_key: false,
      polymorphic: false,
      null: nil
    ); end

    # == Timestamps

    sig { params(table_name: T.any(String, Symbol), options: T.untyped).void }
    def add_timestamps(table_name, options = {}); end

    sig { params(table_name: T.any(String, Symbol), options: T.untyped).void }
    def remove_timestamps(table_name, options = {}); end

    # == Extensions
    sig { params(name: T.any(String, Symbol)).void }
    def enable_extension(name); end

    sig { params(name: T.any(String, Symbol)).void }
    def disable_extension(name); end

    # == Miscellaneous
    sig { params(message: String, subitem: T.untyped).void }
    def say(message, subitem = false); end

    sig { params(message: String, blk: T.untyped).returns(T.untyped) }
    def say_with_time(message, &blk); end

    sig { params(blk: T.untyped).void }
    def suppress_messages(&blk); end

    sig { params(blk: T.proc.params(arg0: T.untyped).void).void }
    def reversible(&blk); end

    sig do
      params(
        migration_classes: T.untyped,
        blk: T.nilable(T.proc.params(arg0: T.untyped).void),
      ).void
    end
    def revert(*migration_classes, &blk); end

    sig { params(sql: String, name: T.nilable(String)).returns(T.untyped) }
    def execute(sql, name = nil); end
  end

  module QueryMethods
    sig {params(args: T.untyped).returns(ActiveRecord::Relation)}
    def includes(*args); end
  end

  class RecordNotDestroyed
    sig {returns(Base)}
    def record; end
  end

  class Relation
    sig { returns(T::Array[Base]) }
    def to_a; end
  end

  module Serialization
    sig { params(options: T.untyped).returns(T::Hash[String, T.untyped]) }
    def serializable_hash(options = T.unsafe(nil)); end
  end

  module Suppressor
    sig { params(_arg0: T.untyped).returns(T::Boolean) }
    def save(**_arg0); end

    sig { params(_arg0: T.untyped).returns(TrueClass) }
    def save!(**_arg0); end
  end

  module Transactions
    sig { params(_arg0: T.untyped).returns(T::Boolean) }
    def save(**_arg0); end

    sig { params(_arg0: T.untyped).returns(TrueClass) }
    def save!(**_arg0); end

    module ClassMethods
      sig do
        type_parameters(:U).
          params(
            options: T.untyped,
            block: T.proc.returns(T.type_parameter((:U))),
          ).returns(T.type_parameter((:U)))
      end
      def transaction(**options, &block); end
    end
  end
end
