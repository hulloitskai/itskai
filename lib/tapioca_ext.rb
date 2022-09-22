# typed: ignore
# frozen_string_literal: true

class Tapioca::Dsl::Helpers::ActiveRecordColumnTypeHelper
  def type_for(column_name)
    return "T.untyped", "T.untyped" if do_not_generate_strong_types?(@constant)

    column_type = @constant.attribute_types[column_name]
    getter_type =
      case column_type
      when defined?(MoneyColumn) && MoneyColumn::ActiveRecordType
        "::Money"
      when ActiveRecord::Type::Integer
        "::Integer"
      when ActiveRecord::Type::String
        "::String"
      when ActiveRecord::Type::Date
        "::Date"
      when ActiveRecord::Type::Decimal
        "::BigDecimal"
      when ActiveRecord::Type::Float
        "::Float"
      when ActiveRecord::Type::Boolean
        "T::Boolean"
      when ActiveRecord::Type::DateTime, ActiveRecord::Type::Time
        "::Time"
      when ActiveRecord::AttributeMethods::TimeZoneConversion::TimeZoneConverter
        "::ActiveSupport::TimeWithZone"
      when ActiveRecord::ConnectionAdapters::PostgreSQL::OID::Uuid
        "::String"
      else
        handle_unknown_type(column_type)
      end

    column = @constant.columns_hash[column_name]
    setter_type = getter_type

    if column&.null
      return as_nilable_type(getter_type), as_nilable_type(setter_type)
    end

    if column_name == @constant.primary_key || column_name == "created_at" ||
         column_name == "updated_at"
      getter_type = as_nilable_type(getter_type)
    end

    [getter_type, setter_type]
  end
end
