# typed: ignore
# frozen_string_literal: true

require "tapioca/dsl/helpers/active_record_column_type_helper"

class Tapioca::Dsl::Helpers::ActiveRecordColumnTypeHelper
  module Extension
    def handle_unknown_type(column_type)
      case column_type
      when ActiveRecord::ConnectionAdapters::PostgreSQL::OID::Uuid
        "::String"
      else
        super
      end
    end
  end

  prepend Extension
end
