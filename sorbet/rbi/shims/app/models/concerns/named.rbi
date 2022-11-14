# typed: strong

module Named
  include GeneratedAttributeMethods

  module GeneratedAttributeMethods
    sig { returns(::String) }
    def name; end

    sig { params(value: ::String).returns(::String) }
    def name=(value); end

    sig { returns(T::Boolean) }
    def name?; end

    sig { returns(T.nilable(::String)) }
    def name_before_last_save; end

    sig { returns(T.untyped) }
    def name_before_type_cast; end

    sig { returns(T::Boolean) }
    def name_came_from_user?; end

    sig { returns(T.nilable([::String, ::String])) }
    def name_change; end

    sig { returns(T.nilable([::String, ::String])) }
    def name_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def name_changed?; end

    sig { returns(T.nilable(::String)) }
    def name_in_database; end

    sig { returns(T.nilable([::String, ::String])) }
    def name_previous_change; end

    sig { returns(T::Boolean) }
    def name_previously_changed?; end

    sig { returns(T.nilable(::String)) }
    def name_previously_was; end

    sig { returns(T.nilable(::String)) }
    def name_was; end

    sig { void }
    def name_will_change!; end
  end
end
