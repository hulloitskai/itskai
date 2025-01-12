# typed: true

module ActiveRecord
  class Migration::Current
    # https://api.rubyonrails.org/v7.0/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html
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
        blk: T.proc.params(
          t: ActiveRecord::ConnectionAdapters::PostgreSQL::Table,
        ).void,
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
        blk: T.nilable(T.proc.params(
          t: ActiveRecord::ConnectionAdapters::PostgreSQL::Table,
        ).void),
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
        blk: T.nilable(T.proc.params(
          t: ActiveRecord::ConnectionAdapters::PostgreSQL::Table,
        ).void),
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
        blk: T.nilable(T.proc.params(
          t: ActiveRecord::ConnectionAdapters::PostgreSQL::Table,
        ).void),
      ).void
    end
    def drop_join_table(table_1, table_2, options = {}, &blk); end
  end
end
