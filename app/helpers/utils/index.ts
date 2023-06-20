export { default as isUrl } from "is-url";
export type { DeepRequired } from "./deepRequired";
export type { Widen } from "./widen";
export { formatJSON } from "./json";
export { formatError } from "./errors";
export { usePrevious } from "./hooks";

export const resolve = <T>(f: () => T): T => f();
