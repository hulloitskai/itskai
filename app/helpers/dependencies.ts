import { setupActiveStorage } from "~/helpers/activestorage";
import { setupLuxon } from "~/helpers/luxon";

// == Polyfills
import "requestidlecallback-polyfill";

// == Setup
setupActiveStorage();
setupLuxon();
