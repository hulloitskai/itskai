import type _FS from "@fullstory/browser";

declare global {
  const FS: typeof _FS | undefined;

  interface Window {
    FS: typeof _FS | undefined;
  }
}
