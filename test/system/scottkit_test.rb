# typed: true
# frozen_string_literal: true

require "application_system_test_case"

class ScottkitTest < ApplicationSystemTestCase
  test "renders" do
    visit(scottkit_path)
    assert_text(
      "this is a toolkit for scott, built and maintained by his boys.",
      wait: 1,
    )
  end
end
