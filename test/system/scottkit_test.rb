# typed: true
# frozen_string_literal: true

require "application_system_test_case"

class ScottkitTest < ApplicationSystemTestCase
  test "renders" do
    visit(scottkit_path)
    assert_text(
      "This is a toolkit for Scott, built and maintained by his boys.",
    )
  end
end
