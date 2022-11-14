import type { ReactElement, ComponentType } from "react";
import type { Page, PageProps, Errors } from "@inertiajs/inertia";
import { SetupOptions } from "@inertiajs/inertia-react";

import AppContainer from "~/components/AppContainer";

export type SharedProps = {
  readonly flash?: Record<string, string>;
};

export type PageComponent<P = {}> = ComponentType<
  P & { readonly errors?: Errors } & SharedProps
> & {
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
  <AppContainer>
    <App {...props} />
  </AppContainer>
);

export const usePageProps = (): PageProps & SharedProps => {
  const { props } = usePage<Page<SharedProps>>();
  return omit(props, "errors") as PageProps & SharedProps;
};

export const usePageErrors = (): Errors => {
  const { props } = usePage();
  const { errors } = props;
  return errors;
};
