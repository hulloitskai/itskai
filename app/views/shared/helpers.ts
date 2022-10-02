export { formatError } from "./helpers/errors";
export { usePreloadedQuery } from "./helpers/apollo";

export const resolve = <T>(f: () => T): T => f();
