import { type Page } from "@inertiajs/core";
import { usePage as _usePage } from "@inertiajs/react";
import { type ComponentType } from "react";

export type PageComponent<Props extends SharedPageProps = SharedPageProps> =
  ComponentType<Props> & {
    layout?: ((page: ReactNode) => ReactNode) | null;
  };

export const parsePageImports = <T,>(
  imports: Record<string, T>,
): Record<string, T> => {
  return mapKeys(imports, (file, path) => {
    const nameWithExtension = path.split(/[\\/]/).pop()!;
    return nameWithExtension.split(".").shift()!;
  });
};

export const usePage = <
  Props extends SharedPageProps = SharedPageProps,
>(): Page<Props> => _usePage();

export const usePageProps = <
  Props extends SharedPageProps = SharedPageProps,
>(): Props => {
  const { props } = usePage<Props>();
  return props;
};

export enum PageType {
  Email = "email",
  Page = "page",
}

export const resolvePageType = (name: string): PageType => {
  return name.endsWith("Email") ? PageType.Email : PageType.Page;
};
