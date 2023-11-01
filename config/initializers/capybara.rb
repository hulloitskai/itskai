# typed: strict
# frozen_string_literal: true

return unless defined?(Capybara)

if Rails.env.test?
  Capybara.register_driver(:headless_chrome) do |app|
    Capybara::Selenium::Driver.new(
      app,
      browser: :chrome,
      options: Selenium::WebDriver::Chrome::Options.new(
        args: %w[headless window-size=1400,1000],
      ),
    )
  end
end
