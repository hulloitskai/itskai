import Clarity from "@microsoft/clarity";

import { getMeta } from "~/helpers/meta";

export const setupClarity = () => {
  const projectId = getMeta("clarity-project-id");
  if (projectId) {
    Clarity.init(projectId);
    console.info("initialized Clarity", projectId);
  } else {
    console.warn("missing Clarity project ID; skipping initialization");
  }
};
