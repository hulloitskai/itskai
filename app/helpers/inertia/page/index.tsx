import type { ComponentType, ReactNode } from "react";

import { usePage as _usePage } from "@inertiajs/react";
import type { ErrorBag, Errors, Page, PageProps } from "@inertiajs/core";

export const parsePageImports = <T,>(
  imports: Record<string, T>,
): Record<string, T> => {
  return mapKeys(imports, (file, path) => {
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

export type PagePropsWithData<Data = undefined> = SharedPageProps & {
  readonly data: Data;
};

export const usePageErrors = (): Errors & ErrorBag => {
  const { props } = usePage();
  return props.errors;
};

export const usePage = <P extends PageProps>(): Page<P> => {
  return _usePage() as Page<P>;
};

export const usePageProps = <P extends PageProps>(): P & SharedPageProps => {
  const { props } = usePage<SharedPageProps & P>();
  return omit(props, "errors") as unknown as P & SharedPageProps;
};

export enum PageType {
  Email = "email",
  Page = "page",
}

export const resolvePageType = (name: string): PageType =>
  name.endsWith("Email") ? PageType.Email : PageType.Page;
