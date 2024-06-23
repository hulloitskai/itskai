import { init } from "@fullstory/browser";
import { environment, getMeta } from "~/helpers/meta";

export const setupFullStory = () => {
  const env = environment();
  const orgId = getMeta("fullstory-org-id");
  if (orgId) {
    const options = {
      orgId,
      devMode: env === "development",
    };
    init(options);
    console.info("Initialized FullStory:", options);
  } else {
    console.warn("Missing FullStory missing org ID; skipping initialization");
  }
};
