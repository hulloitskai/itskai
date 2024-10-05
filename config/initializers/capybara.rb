# typed: strict
# frozen_string_literal: true

return unless defined?(Capybara)

Capybara.default_max_wait_time = 15
Capybara.register_driver(:playwright) do |app|
  Capybara::Playwright::Driver.new(app)
end
