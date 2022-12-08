# typed: strong

module Discardable
  include GeneratedAttributeMethods

  module GeneratedAttributeMethods
    sig { returns(T.nilable(::ActiveSupport::TimeWithZone)) }
    def discarded_at; end

    sig { params(value: T.nilable(::ActiveSupport::TimeWithZone)).returns(T.nilable(::ActiveSupport::TimeWithZone)) }
    def discarded_at=(value); end

    sig { returns(T::Boolean) }
    def discarded_at?; end

    sig { returns(T.nilable(::ActiveSupport::TimeWithZone)) }
    def discarded_at_before_last_save; end

    sig { returns(T.untyped) }
    def discarded_at_before_type_cast; end

    sig { returns(T::Boolean) }
    def discarded_at_came_from_user?; end

    sig { returns(T.nilable([T.nilable(::ActiveSupport::TimeWithZone), T.nilable(::ActiveSupport::TimeWithZone)])) }
    def discarded_at_change; end

    sig { returns(T.nilable([T.nilable(::ActiveSupport::TimeWithZone), T.nilable(::ActiveSupport::TimeWithZone)])) }
    def discarded_at_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def discarded_at_changed?; end

    sig { returns(T.nilable(::ActiveSupport::TimeWithZone)) }
    def discarded_at_in_database; end

    sig { returns(T.nilable([T.nilable(::ActiveSupport::TimeWithZone), T.nilable(::ActiveSupport::TimeWithZone)])) }
    def discarded_at_previous_change; end

    sig { returns(T::Boolean) }
    def discarded_at_previously_changed?; end

    sig { returns(T.nilable(::ActiveSupport::TimeWithZone)) }
    def discarded_at_previously_was; end

    sig { returns(T.nilable(::ActiveSupport::TimeWithZone)) }
    def discarded_at_was; end

    sig { void }
    def discarded_at_will_change!; end
  end
end
