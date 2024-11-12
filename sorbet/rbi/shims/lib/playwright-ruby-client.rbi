# typed: strong

module Playwright
  sig do
    params(
      playwright_cli_executable_path: String,
      block: T.proc.params(playwright: Playwright).void,
    ).returns(T.nilable(Execution))
  end
  def self.create(playwright_cli_executable_path:, &block); end

  class Playwright
    sig { returns(BrowserType) }
    def chromium; end
  end

  class BrowserType
    sig do
      params(
        endpointURL: T.untyped,
        headers: T.untyped,
        slowMo: T.untyped,
        timeout: T.untyped,
        block: T.nilable(T.proc.params(browser: Browser).void),
      ).returns(Browser)
    end
    def connect_over_cdp(endpointURL, headers: T.unsafe(nil), slowMo: T.unsafe(nil), timeout: T.unsafe(nil), &block); end
  end

  class Browser
    sig do
      params(
        acceptDownloads: T.untyped,
        baseURL: T.untyped,
        bypassCSP: T.untyped,
        clientCertificates: T.untyped,
        colorScheme: T.untyped,
        deviceScaleFactor: T.untyped,
        extraHTTPHeaders: T.untyped,
        forcedColors: T.untyped,
        geolocation: T.untyped,
        hasTouch: T.untyped,
        httpCredentials: T.untyped,
        ignoreHTTPSErrors: T.untyped,
        isMobile: T.untyped,
        javaScriptEnabled: T.untyped,
        locale: T.untyped,
        noViewport: T.untyped,
        offline: T.untyped,
        permissions: T.untyped,
        proxy: T.untyped,
        record_har_content: T.untyped,
        record_har_mode: T.untyped,
        record_har_omit_content: T.untyped,
        record_har_path: T.untyped,
        record_har_url_filter: T.untyped,
        record_video_dir: T.untyped,
        record_video_size: T.untyped,
        reducedMotion: T.untyped,
        screen: T.untyped,
        serviceWorkers: T.untyped,
        storageState: T.untyped,
        strictSelectors: T.untyped,
        timezoneId: T.untyped,
        userAgent: T.untyped,
        viewport: T.untyped,
        block: T.untyped,
      ).returns(Page)
    end
    def new_page(acceptDownloads: T.unsafe(nil), baseURL: T.unsafe(nil), bypassCSP: T.unsafe(nil), clientCertificates: T.unsafe(nil), colorScheme: T.unsafe(nil), deviceScaleFactor: T.unsafe(nil), extraHTTPHeaders: T.unsafe(nil), forcedColors: T.unsafe(nil), geolocation: T.unsafe(nil), hasTouch: T.unsafe(nil), httpCredentials: T.unsafe(nil), ignoreHTTPSErrors: T.unsafe(nil), isMobile: T.unsafe(nil), javaScriptEnabled: T.unsafe(nil), locale: T.unsafe(nil), noViewport: T.unsafe(nil), offline: T.unsafe(nil), permissions: T.unsafe(nil), proxy: T.unsafe(nil), record_har_content: T.unsafe(nil), record_har_mode: T.unsafe(nil), record_har_omit_content: T.unsafe(nil), record_har_path: T.unsafe(nil), record_har_url_filter: T.unsafe(nil), record_video_dir: T.unsafe(nil), record_video_size: T.unsafe(nil), reducedMotion: T.unsafe(nil), screen: T.unsafe(nil), serviceWorkers: T.unsafe(nil), storageState: T.unsafe(nil), strictSelectors: T.unsafe(nil), timezoneId: T.unsafe(nil), userAgent: T.unsafe(nil), viewport: T.unsafe(nil), &block); end

    sig { returns(T::Array[BrowserContext]) }
    def contexts; end
  end

  class BrowserContext
    sig { returns(T::Array[Page]) }
    def pages; end
  end
end
