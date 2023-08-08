# typed: true
# frozen_string_literal: true

class ResumesController < ApplicationController
  # == Actions
  # GET /resume
  def show
    respond_to do |format|
      format.html do
        printable = params["printable"].truthy?
        render(inertia: "ResumePage", props: { printable: })
      end
      format.json do
        render(json: Resume.data)
      end
      format.pdf do
        thread = Thread.new { print_resume }
        data = T.cast(thread.join.value, String)
        send_data(
          data,
          filename: "kai-xie-resume.pdf",
          type: "application/pdf",
          disposition: "inline",
        )
      end
    end
  end

  private

  # == Helpers
  sig { returns(String) }
  def print_resume
    require "selenium-webdriver"
    driver = Selenium::WebDriver.for(
      :chrome,
      options: Selenium::WebDriver::Chrome::Options.new.tap do |options|
        options = T.let(options, Selenium::WebDriver::Chrome::Options)
        options.add_argument("--headless")
        options.add_argument("--window-size=1400,1000")
        if OS.linux?
          options.add_argument("--no-sandbox")
          options.add_argument("--disable-dev-shm-usage")
        end
      end,
    )
    driver = T.let(
      driver,
      T.all(Selenium::WebDriver::Chrome::Driver,
            Selenium::WebDriver::DriverExtensions::PrintsPage),
    )
    driver.get(resume_url(printable: true))
    Selenium::WebDriver::Wait.new.until do
      driver.execute_script(
        "return window.performance.timing.loadEventEnd > 0",
      ) && driver.execute_script(
        'return window.performance.getEntriesByType("paint").length > 0',
      )
    end
    Base64.decode64(driver.print_page)
  end
end
