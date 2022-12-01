import type _Honeybadger from "@honeybadger-io/js";

declare global {
  const Honeybadger: typeof _Honeybadger | undefined;

  interface Window {
    Honeybadger: typeof _Honeybadger | undefined;
  }
}
