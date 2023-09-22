# typed: strict
# frozen_string_literal: true

class ActionView::Helpers::TagHelper::TagBuilder
  T::Sig::WithoutRuntime.sig { params(key: T.untyped).returns(String) }
  def boolean_tag_option(key)
    key.to_s
  end
end
