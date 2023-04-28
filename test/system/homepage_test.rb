# typed: true
# frozen_string_literal: true

require "application_system_test_case"

class HomepageTest < ApplicationSystemTestCase
  test "renders" do
    visit(root_path)
    assert_text("welcome to my little corner of the internet :)")
  end
end
