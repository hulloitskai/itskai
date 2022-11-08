import type { ReactElement, ComponentType } from "react";
import type { PageProps } from "@inertiajs/inertia";
import type { SetupOptions } from "@inertiajs/inertia-react";

import AppProviders from "~/components/AppProviders";
import { withAppLayout } from "~/components/AppLayout";

export type PageComponent<P = {}> = ComponentType<P> & {
  layout?: ((page: ReactElement) => ReactElement) | null;
};

export const pagesFromFiles = <T,>(
  files: Record<string, T>,
): Record<string, T> => {
  return mapKeys(files, (file, path) => {
    const nameWithExtension = path.split(/[\\/]/).pop()!;
    return nameWithExtension.split(".").shift()!;
  });
};

export const setupPage = (page: PageComponent): PageComponent => {
  if (page.layout === undefined) {
    page.layout = withAppLayout;
  }
  return page;
};

export type SetupAppOptions = Omit<SetupOptions<null, PageProps>, "el">;

export const setupApp = ({ App, props }: SetupAppOptions): ReactElement => (
  <AppProviders>
    <App {...props} />
  </AppProviders>
);
