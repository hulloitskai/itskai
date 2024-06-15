import { init, FullStory } from "@fullstory/browser";
import { getMeta } from "~/helpers/meta";
import { formatJSON } from "~/helpers/json";
import { isNil, omitBy } from "lodash-es";
import { resolve } from "~/helpers/utils";

const orgId = getMeta("fullstory-org-id");
if (orgId) {
  const devMode = getMeta("env") === "development";
  const identity = resolve(() => {
    const jsonString = getMeta("fullstory-identity");
    if (jsonString) {
      return JSON.parse(jsonString) as {
        uid: string;
        email: string;
        displayName: string;
      };
    }
  });

  // TODO: Update FullStory user after login.
  init({ orgId, devMode }, () => {
    if (identity) {
      const { uid, ...properties } = identity;
      FullStory("setIdentityAsync", formatJSON({ uid, properties }));
    }
  });
  console.info(
    "Initialized FullStory:",
    formatJSON(omitBy({ orgId, identity, devMode }, isNil)),
  );
} else {
  console.warn("Missing FullStory missing org ID; skipping initialization");
}
