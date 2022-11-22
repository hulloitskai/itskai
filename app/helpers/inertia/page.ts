import type { ReactNode, ComponentType } from "react";
import type { Page, Errors, ErrorBag } from "@inertiajs/inertia";

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

export const usePageErrors = (): Errors & ErrorBag => {
  const {
    props: { errors },
  } = usePage();
  return errors;
};

export const usePageProps = <PageProps>(): PageProps & SharedPageProps => {
  const { props } = usePage<Page<SharedPageProps & PageProps>>();
  return omit(props, "errors") as PageProps & SharedPageProps;
};

export const usePageData = <
  PageProps extends { data: T },
  T = PageProps["data"],
>(): T => {
  const { data } = usePageProps<PageProps>();
  return data;
};
