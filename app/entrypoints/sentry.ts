import { init, setUser } from "@sentry/react";
import { formatJSON } from "~/helpers/json";
import { getMeta } from "~/helpers/meta";
import { omit, omitBy, isNil } from "lodash";
import type { BrowserOptions } from "@sentry/react";

import { captureConsoleIntegration } from "@sentry/integrations";
import { httpClientIntegration } from "@sentry/integrations";

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
      captureConsoleIntegration({ levels: ["error", "assert"] }),
      httpClientIntegration(),
    ],
    ignoreErrors: [
      "ResizeObserver loop completed with undelivered notifications.",
    ],
    enabled: environment !== "development",
  };
  init(options);
  console.info(
    "Initialized Sentry:",
    formatJSON(
      omitBy(
        omit(options, "defaultIntegrations", "integrations", "_metadata"),
        isNil,
      ),
    ),
  );

  // TODO: Update Sentry user after login.
  const user = resolve(() => {
    const jsonString = getMeta("sentry-user");
    if (jsonString) {
      return JSON.parse(jsonString);
    }
  });
  if (user) {
    setUser(user);
    console.info("Set Sentry user:", formatJSON(user));
  }
} else {
  console.warn("Missing Sentry DSN; skipping initialization");
}
