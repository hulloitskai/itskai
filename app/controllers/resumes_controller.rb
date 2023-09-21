# typed: true
# frozen_string_literal: true

class ResumesController < ApplicationController
  # == Actions

  # GET /resume
  #
  # FIXME: Loading the PDF resume immediately after the app boots in development
  # causes the app to hang. Not sure why.
  def show
    variant = T.cast(params["variant"].presence, T.nilable(String))
    respond_to do |format|
      format.html do
        printable = params["printable"].truthy?
        data = query!("ResumePageQuery", { variant: })
        props = {
          data:,
          variant:,
          printable:,
        }
        render(inertia: "ResumePage", props: props.compact)
      end
      format.json do
        render(json: Resume.data(variant: variant&.to_sym))
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

  private

  # == Helpers
  sig do
    returns(T.all(Selenium::WebDriver::Chrome::Driver,
                  Selenium::WebDriver::DriverExtensions::PrintsPage))
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
      T.nilable(T.all(Selenium::WebDriver::Chrome::Driver,
                      Selenium::WebDriver::DriverExtensions::PrintsPage)),
    )
  end

  sig { params(variant: T.nilable(Symbol)).returns(String) }
  def print_resume(variant:)
    params = { printable: true, variant: }
    driver = webdriver
    driver.get(resume_url(params.compact))
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
