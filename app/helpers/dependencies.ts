import { setupInertia } from "./inertia";
import { setupActiveStorage } from "./activestorage";
import { setupLuxon } from "./luxon";

// == Polyfills
import "requestidlecallback-polyfill";

// == Setup
setupInertia();
setupActiveStorage();
setupLuxon();
