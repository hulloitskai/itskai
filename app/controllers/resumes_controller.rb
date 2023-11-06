# typed: true
# frozen_string_literal: true

require "resume"

class ResumesController < ApplicationController
  include Concurrent

  # == Actions

  # GET /resume
  #
  # FIXME: Loading the PDF resume immediately after the app boots in development
  # causes the app to hang. Not sure why.
  def show
    variant = T.cast(params["variant"].presence, T.nilable(String))
    respond_to do |format|
      format.html do
        printable = params["_printable"].truthy?
        data = query!("ResumePageQuery", { variant: })
        props = {
          data:,
          variant:,
          printable:,
        }
        render(inertia: "ResumePage", props: props.compact)
      end
      format.json do
        render(json: Resume.current(variant: variant&.to_sym))
      end
      format.pdf do
        data = print_resume(variant: variant&.to_sym)
        name = ["kai-xie-resume", variant].compact.join("--")
        send_data(
          data,
          filename: "#{name}.pdf",
          type: "application/pdf",
          disposition: "inline",
        )
      end
    end
  end

  # == Helpers
  sig { returns(Semaphore) }
  def self.print_resume_semaphore
    @print_resume_semaphore ||= T.let(Semaphore.new(1), T.nilable(Semaphore))
  end

  private

  # == Helpers
  sig do
    returns(T.all(
      Selenium::WebDriver::Chrome::Driver,
      Selenium::WebDriver::DriverExtensions::PrintsPage,
    ))
  end
  def webdriver
    @webdriver ||= T.let(
      Selenium::WebDriver.for(
        :chrome,
        options: Selenium::WebDriver::Chrome::Options.new.tap do |options|
          options = T.let(options, Selenium::WebDriver::Chrome::Options)
          options.add_argument("--headless")
          options.add_argument("--window-size=1400,1000")
          options.add_argument("--kiosk-printing")
          if OS.linux?
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
          end
        end,
      ),
      T.nilable(T.all(
        Selenium::WebDriver::Chrome::Driver,
        Selenium::WebDriver::DriverExtensions::PrintsPage,
      )),
    )
  end

  sig { params(variant: T.nilable(Symbol)).returns(String) }
  def print_resume(variant:)
    self.class.print_resume_semaphore.acquire do
      params = { variant:, _printable: true }
      url = resume_url(
        protocol: "http",
        host: "localhost",
        port: ENV.fetch("RAILS_PORT") { 3000 }.to_i,
        **params.compact,
      )
      driver = webdriver
      driver.get(url)
      Selenium::WebDriver::Wait.new.until do
        driver.execute_script(
          "return window.performance.timing.loadEventEnd > 0",
        ) && driver.execute_script(
          'return window.performance.getEntriesByType("paint").length > 0',
        )
      end
      page_str = driver.print_page
      Base64.decode64(page_str)
    end
  end
end
