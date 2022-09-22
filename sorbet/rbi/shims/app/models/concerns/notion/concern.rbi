# typed: strong

module Notion::Concern
  include GeneratedAttributeMethods

  module GeneratedAttributeMethods
    sig { returns(T.nilable(::String)) }
    def notion_page_id; end

    sig { params(value: T.nilable(::String)).returns(T.nilable(::String)) }
    def notion_page_id=(value); end

    sig { returns(T::Boolean) }
    def notion_page_id?; end

    sig { returns(T.nilable(::String)) }
    def notion_page_id_before_last_save; end

    sig { returns(T.untyped) }
    def notion_page_id_before_type_cast; end

    sig { returns(T::Boolean) }
    def notion_page_id_came_from_user?; end

    sig { returns(T.nilable([T.nilable(::String), T.nilable(::String)])) }
    def notion_page_id_change; end

    sig { returns(T.nilable([T.nilable(::String), T.nilable(::String)])) }
    def notion_page_id_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def notion_page_id_changed?; end

    sig { returns(T.nilable(::String)) }
    def notion_page_id_in_database; end

    sig { returns(T.nilable([T.nilable(::String), T.nilable(::String)])) }
    def notion_page_id_previous_change; end

    sig { returns(T::Boolean) }
    def notion_page_id_previously_changed?; end

    sig { returns(T.nilable(::String)) }
    def notion_page_id_previously_was; end

    sig { returns(T.nilable(::String)) }
    def notion_page_id_was; end

    sig { void }
    def notion_page_id_will_change!; end

    sig { returns(T.nilable(::DateTime)) }
    def notion_updated_at; end

    sig { params(value: T.nilable(::DateTime)).returns(T.nilable(::DateTime)) }
    def notion_updated_at=(value); end

    sig { returns(T::Boolean) }
    def notion_updated_at?; end

    sig { returns(T.nilable(::DateTime)) }
    def notion_updated_at_before_last_save; end

    sig { returns(T.untyped) }
    def notion_updated_at_before_type_cast; end

    sig { returns(T::Boolean) }
    def notion_updated_at_came_from_user?; end

    sig { returns(T.nilable([T.nilable(::DateTime), T.nilable(::DateTime)])) }
    def notion_updated_at_change; end

    sig { returns(T.nilable([T.nilable(::DateTime), T.nilable(::DateTime)])) }
    def notion_updated_at_change_to_be_saved; end

    sig { returns(T::Boolean) }
    def notion_updated_at_changed?; end

    sig { returns(T.nilable(::DateTime)) }
    def notion_updated_at_in_database; end

    sig { returns(T.nilable([T.nilable(::DateTime), T.nilable(::DateTime)])) }
    def notion_updated_at_previous_change; end

    sig { returns(T::Boolean) }
    def notion_updated_at_previously_changed?; end

    sig { returns(T.nilable(::DateTime)) }
    def notion_updated_at_previously_was; end

    sig { returns(T.nilable(::DateTime)) }
    def notion_updated_at_was; end

    sig { void }
    def notion_updated_at_will_change!; end
  end
end
