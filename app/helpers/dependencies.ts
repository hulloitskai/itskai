import { setupInertia } from "./inertia";
import { setupFetch } from "./fetch";
import { setupActiveStorage } from "./activestorage";
import { setupLuxon } from "./luxon";

// == Polyfills
import "requestidlecallback-polyfill";

// == Setup
setupInertia();
setupFetch();
setupActiveStorage();
setupLuxon();
