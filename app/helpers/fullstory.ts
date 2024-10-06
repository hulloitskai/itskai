import { type SnippetOptions } from "@fullstory/browser";
import { init } from "@fullstory/browser";

import { getMeta, requireEnv } from "~/helpers/meta";

export const setupFullStory = () => {
  const env = requireEnv();
  const orgId = getMeta("fullstory-org-id");
  if (orgId) {
    const options: SnippetOptions = {
      orgId,
      devMode: env === "development",
      debug: true,
    };
    init(options);
    console.info("Initialized FullStory:", options);
  } else {
    console.warn("Missing FullStory org ID; skipping initialization");
  }
};
