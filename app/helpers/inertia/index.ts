export {
  usePageData,
  usePageErrors,
  usePageProps,
  pagesFromFiles,
} from "./page";
export type { PageComponent, SharedPageProps } from "./page";

export { setupApp } from "./app";
export type { SetupAppOptions } from "./app";

export { Router, useRouter } from "./router";
export type { RouterOptions } from "./router";

export { layoutWithData } from "./layout";
export type { LayoutWithDataFn } from "./layout";

export type { ProviderProps } from "./provider";

export { useBaggedErrors } from "./errors";

// export const setupPage = (page: PageComponent): PageComponent => {
//   if (page.layout === undefined) {
//     page.layout = withAppLayout;
//   }
//   return page;
// };
