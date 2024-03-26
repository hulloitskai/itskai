import { init, FullStory } from "@fullstory/browser";

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
  init({ orgId, devMode }, () => {
    if (identity) {
      const { uid, ...properties } = identity;
      FullStory("setIdentityAsync", { uid, properties });
    }
  });
  console.info(
    "Initialized FullStory",
    omitBy({ orgId, identity, devMode }, isNil),
  );
} else {
  console.warn("Missing FullStory missing org ID; skipping initialization");
}
