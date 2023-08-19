import { init, setUser } from "@sentry/react";
import type { BrowserOptions } from "@sentry/react";

import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import { HttpClient as HttpClientIntegration } from "@sentry/integrations";

const dsn = getMeta("sentry-dsn");
if (dsn) {
  const environment = getMeta("env");
  const tracesSampleRate = resolve(() => {
    const value = getMeta("sentry-traces-sample-rate");
    if (value) {
      return parseFloat(value) || 0;
    }
    return 0;
  });
  const options: BrowserOptions = {
    dsn,
    environment,
    tracesSampleRate,
    sendDefaultPii: true,
    integrations: [
      new CaptureConsoleIntegration({ levels: ["error", "assert"] }),
      new HttpClientIntegration(),
    ],
    ignoreErrors: [
      "ResizeObserver loop completed with undelivered notifications.",
    ],
  };
  init(options);
  console.info(
    "Initialized Sentry",
    omitBy(
      omit(options, "defaultIntegrations", "integrations", "_metadata"),
      isNil,
    ),
  );

  const user = resolve(() => {
    const jsonString = getMeta("sentry-user");
    if (jsonString) {
      return JSON.parse(jsonString);
    }
  });
  if (user) {
    setUser(user);
    console.info("Set Sentry user", user);
  }
} else {
  console.warn("Missing Sentry DSN; skipping initialization");
}
