import { setupInertia } from "./inertia";
import { setupFetch } from "./fetch";
import { setupActiveStorage } from "./activestorage";
import { setupLuxon } from "./luxon";
import { setupFullStory } from "./fullstory";
import { setupSentry } from "./sentry";

// == Polyfills
import "requestidlecallback-polyfill";

// == Setup
setupInertia();
setupFetch();
setupLuxon();
setupActiveStorage();
setupSentry();
setupFullStory();
