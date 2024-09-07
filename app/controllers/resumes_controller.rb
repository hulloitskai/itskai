# typed: true
# frozen_string_literal: true

class ResumesController < ApplicationController
  include Concurrent

  # == Actions
  # GET /resume
  #
  # FIXME: Loading the PDF resume immediately after the app boots in development
  # causes the app to hang. Not sure why.
  def show
    variant = T.let(params["variant"].presence, T.nilable(String))
    respond_to do |format|
      format.html do
        print_mode = request.headers["X-Print-Mode"].truthy?
        resume = ::Resume.current(variant: variant&.to_sym)
        render(
          inertia: "ResumePage",
          props: { resume:, variant:, "printMode" => print_mode },
        )
      end
      format.json do
        data = Resume.current(variant: variant&.to_sym)
        unless data
          raise ActionController::RoutingError,
                "Missing resume data (variant: #{variant})"
        end
        json = JSON.neat_generate(
          data,
          after_colon: 1,
          object_padding: 1,
        )
        render(json:)
      end
      format.pdf do
        unless Resume.exists?(variant: variant&.to_sym)
          raise ActionController::RoutingError,
                "Missing resume data (variant: #{variant})"
        end
        basename = ["kai-xie-resume", variant].compact.join("--")
        Tempfile.open([basename, ".pdf"]) do |f|
          print_resume_to_file(f.to_path, variant: variant&.to_sym)
          send_file(f, filename: basename + ".pdf", disposition: "inline")
        end
      end
    end
  end

  # == Helpers
  sig { returns(Semaphore) }
  def self.print_resume_semaphore
    @print_resume_semaphore ||= T.let(Semaphore.new(1), T.nilable(Semaphore))
  end
  externally_typed_delegate :print_resume_semaphore, to: :class

  private

  # == Helpers
  sig { params(filepath: String, variant: T.nilable(Symbol)).void }
  def print_resume_to_file(filepath, variant: nil)
    server_options = "Rails::Server::Options".constantize.new.parse!(ARGV) # rubocop:disable Sorbet/ConstantsFromStrings
    server_port = server_options[:Port]
    launch_print_resume_browser do |browser|
      page = browser.new_page
      page.set_extra_http_headers("X-Print-Mode" => "true")
      params = { variant: }
      url = resume_url(
        protocol: "http",
        host: "localhost",
        port: server_port,
        **params.compact,
      )
      page.goto(url)
      page.wait_for_selector(".resume-layout")
      page.wait_for_function("() => document.fonts.ready")
      page.pdf(path: filepath, printBackground: true, pageRanges: "1")
    end
  end

  sig { params(block: T.proc.params(browser: Playwright::Browser).void).void }
  def launch_print_resume_browser(&block)
    print_resume_semaphore.acquire do
      Playwright.create(
        playwright_cli_executable_path: "playwright",
      ) do |playwright|
        playwright.chromium.launch(&block)
      end
    end
  end

  # sig { void }
  # def remove_pdf_tmpdir
  #   if (dir = @pdf_tmpdir)
  #     FileUtils.rm_rf(dir)
  #   end
  # end
end
