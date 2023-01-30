import type { ReactNode, ComponentType } from "react";

import { usePage as _usePage } from "@inertiajs/react";
import type { Page, Errors, ErrorBag } from "@inertiajs/core";

export const pagesFromFiles = <T>(
  files: Record<string, T>,
): Record<string, T> => {
  return mapKeys(files, (file, path) => {
    const nameWithExtension = path.split(/[\\/]/).pop()!;
    return nameWithExtension.split(".").shift()!;
  });
};

export type PageComponent<P = {}> = ComponentType<
  P & { readonly errors?: Errors & ErrorBag } & SharedPageProps
> & {
  layout?: ((page: ReactNode) => ReactNode) | null;
};

export type SharedPageProps = {
  readonly csrf: {
    param: string;
    token: string;
  };
  readonly flash?: Record<string, string>;
};

export type PageProps<Data = undefined> = SharedPageProps & {
  readonly data: Data;
};

export const usePageErrors = (): Errors & ErrorBag => {
  const { props } = usePage();
  return props.errors;
};

export const usePage = <PageProps>(): Page<PageProps> => {
  return _usePage() as Page<PageProps>;
};

export const usePageProps = <PageProps>(): PageProps & SharedPageProps => {
  const { props } = usePage<Page<SharedPageProps & PageProps>>();
  return omit(props, "errors") as PageProps & SharedPageProps;
};
