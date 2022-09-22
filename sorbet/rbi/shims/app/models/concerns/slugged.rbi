# typed: strong

module Slugged
  include GeneratedAttributeMethods

  module GeneratedAttributeMethods
    sig { returns(::String) }
    def slug; end

    sig { params(value: ::String).returns(::String) }
    def slug=(value); end

    sig { returns(T::Boolean) }
    def slug?; end

    sig { returns(T.nilable(::String)) }
    def slug_before_last_save; end

    sig { returns(T.untyped) }
    def slug_before_type_cast; end

    sig { returns(T::Boolean) }
    def slug_came_from_user?; end

    sig { returns(T.nilable([::String, ::String])) }
    def slug_change; end

    sig { returns(T.nilable([::String, ::String])) }
    def slug_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def slug_changed?; end

    sig { returns(T.nilable(::String)) }
    def slug_in_database; end

    sig { returns(T.nilable([::String, ::String])) }
    def slug_previous_change; end

    sig { returns(T::Boolean) }
    def slug_previously_changed?; end

    sig { returns(T.nilable(::String)) }
    def slug_previously_was; end

    sig { returns(T.nilable(::String)) }
    def slug_was; end

    sig { void }
    def slug_will_change!; end
  end
end
