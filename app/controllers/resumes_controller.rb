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
        print_mode = request.headers["X-Print-Mode"].truthy?
        data = query!("ResumePageQuery", { variant: })
        props = { data:, variant:, print_mode: }
        render(inertia: "ResumePage", props: props.compact)
      end
      format.json do
        data = Resume.current(variant: variant&.to_sym)
        json = JSON.neat_generate(
          data,
          after_colon: 1,
          object_padding: 1,
        )
        render(json:)
      end
      format.pdf do
        name = ["kai-xie-resume", variant].compact.join("--")
        Tempfile.open([name, ".pdf"]) do |tempfile|
          print_resume_to_tempfile(tempfile, variant: variant&.to_sym)
          send_file(tempfile.path, disposition: "inline")
        end
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
    params(tempfile: Tempfile, variant: T.nilable(Symbol)).void
  end
  def print_resume_to_tempfile(tempfile, variant: nil)
    server_options = "Rails::Server::Options".constantize.new.parse!(ARGV) # rubocop:disable Sorbet/ConstantsFromStrings
    server_port = server_options[:Port]
    self.class.print_resume_semaphore.acquire do
      Playwright.create(
        playwright_cli_executable_path: "playwright",
      ) do |playwright|
        playwright.chromium.launch do |browser|
          page = T.let(browser.new_page, Playwright::Page)
          page.set_extra_http_headers("X-Print-Mode" => "true")
          params = { variant:, _printable: true }
          url = resume_url(
            protocol: "http",
            host: "localhost",
            port: server_port,
            **params.compact,
          )
          page.goto(url)
          page.wait_for_selector(".resume-layout")
          page.pdf(path: tempfile.path)
        end
      end
    end
  end
end
