import Honeybadger from "@honeybadger-io/js";

import { resolve } from "~/helpers/utils";
import { getMeta } from "~/helpers/meta";
import { pick, omitBy, isNil } from "lodash-es";

const apiKey = getMeta("honeybadger-api-key");
if (apiKey) {
  const environment = getMeta("env");
  const revision = getMeta("honeybadger-revision");
  Honeybadger.configure({
    apiKey,
    environment,
    revision,
    enableUnhandledRejection: false,
  });
  window.Honeybadger = Honeybadger;
  const config = pick(
    Honeybadger.config,
    "environment",
    "revision",
    "filters",
    "debug",
  );
  console.info("Initialized Honeybadger", omitBy(config, isNil));

  const context = resolve(() => {
    const jsonString = getMeta("honeybadger-context");
    if (jsonString) {
      return JSON.parse(jsonString);
    }
  });
  if (context) {
    Honeybadger.setContext(context);
    console.info("Set Honeybadger context", context);
  }
} else {
  console.warn("Missing Honeybadger API key; skipping initialization");
}
