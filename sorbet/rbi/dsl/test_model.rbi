# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `TestModel`.
# Please instead update this file by running `bin/tapioca dsl TestModel`.


class TestModel
  sig { returns(T.nilable(::Date)) }
  def birthday; end

  sig { params(value: T.nilable(::Date)).returns(T.nilable(::Date)) }
  def birthday=(value); end

  sig { returns(T.nilable(::String)) }
  def name; end

  sig { params(value: T.nilable(::String)).returns(T.nilable(::String)) }
  def name=(value); end
end
