import { setupInertia } from "./inertia";
import { setupFetch } from "./fetch";
import { setupActiveStorage } from "./activestorage";
import { setupLuxon } from "./luxon";
import { setupSentry } from "./sentry";
import { setupFullStory } from "./fullstory";

// == Polyfills
import "requestidlecallback-polyfill";

// == Setup
setupInertia();
setupFetch();
setupLuxon();
setupActiveStorage();
setupSentry();
setupFullStory();
