# typed: strong

module Identifiable
  include GeneratedAttributeMethods

  module GeneratedAttributeMethods
    sig { returns(T.nilable(::String)) }
    def id; end

    sig { params(value: ::String).returns(::String) }
    def id=(value); end

    sig { returns(T::Boolean) }
    def id?; end

    sig { returns(T.nilable(::String)) }
    def id_before_last_save; end

    sig { returns(T.untyped) }
    def id_before_type_cast; end

    sig { returns(T::Boolean) }
    def id_came_from_user?; end

    sig { returns(T.nilable([::String, ::String])) }
    def id_change; end

    sig { returns(T.nilable([::String, ::String])) }
    def id_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def id_changed?; end

    sig { returns(T.nilable(::String)) }
    def id_in_database; end

    sig { returns(T.nilable([::String, ::String])) }
    def id_previous_change; end

    sig { returns(T::Boolean) }
    def id_previously_changed?; end

    sig { returns(T.nilable(::String)) }
    def id_previously_was; end

    sig { returns(T.nilable(::String)) }
    def id_was; end

    sig { void }
    def id_will_change!; end
  end
end
