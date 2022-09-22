# typed: strong

module Publishable
  include GeneratedAttributeMethods

  module GeneratedAttributeMethods
    sig { returns(::String) }
    def visibility; end

    sig { params(value: ::String).returns(::String) }
    def visibility=(value); end

    sig { returns(T::Boolean) }
    def visibility?; end

    sig { returns(T.nilable(::String)) }
    def visibility_before_last_save; end

    sig { returns(T.untyped) }
    def visibility_before_type_cast; end

    sig { returns(T::Boolean) }
    def visibility_came_from_user?; end

    sig { returns(T.nilable([::String, ::String])) }
    def visibility_change; end

    sig { returns(T.nilable([::String, ::String])) }
    def visibility_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def visibility_changed?; end

    sig { returns(T.nilable(::String)) }
    def visibility_in_database; end

    sig { returns(T.nilable([::String, ::String])) }
    def visibility_previous_change; end

    sig { returns(T::Boolean) }
    def visibility_previously_changed?; end

    sig { returns(T.nilable(::String)) }
    def visibility_previously_was; end

    sig { returns(T.nilable(::String)) }
    def visibility_was; end

    sig { void }
    def visibility_will_change!; end
  end
end
