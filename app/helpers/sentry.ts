import { type BrowserOptions } from "@sentry/react";
import {
  captureConsoleIntegration,
  contextLinesIntegration,
  httpClientIntegration,
  init,
  replayCanvasIntegration,
  replayIntegration,
} from "@sentry/react";

import { getMeta, requireEnv } from "~/helpers/meta";

export const setupSentry = () => {
  const dsn = getMeta("sentry-dsn");
  const tracesSampleRateString = getMeta("sentry-traces-sample-rate");
  const tracesSampleRate = tracesSampleRateString
    ? parseFloat(tracesSampleRateString)
    : undefined;
  if (dsn) {
    const environment = requireEnv();
    const options: BrowserOptions = {
      dsn,
      environment,
      tracesSampleRate,
      enabled: environment === "production",
      sendDefaultPii: true,
      integrations: [
        contextLinesIntegration(),
        captureConsoleIntegration({ levels: ["error", "assert"] }),
        replayIntegration(),
        replayCanvasIntegration(),
        httpClientIntegration(),
      ],
      ignoreErrors: [
        "ResizeObserver loop completed with undelivered notifications.",
        /Failed to load lyrics.*/,
        "Error loading edge.fullstory.com/s/fs.js",
        "Invalid email or password.",
      ],
    };
    init(options);
    const info = omitBy(omit(options, "ignoreErrors", "integrations"), isNil);
    console.info("Initialized Sentry:", info);
  } else {
    console.warn("Missing Sentry DSN; skipping initialization");
  }
};
