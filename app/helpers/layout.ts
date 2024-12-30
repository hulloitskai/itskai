export type DynamicProp<PageProps extends SharedPageProps, T> =
  | T
  | ((props: PageProps) => T);

export const useResolveDynamicProp = <PageProps extends SharedPageProps, T>(
  prop: T | ((props: PageProps) => T),
  pageProps: PageProps,
) => useMemo(() => resolveDynamicProp(prop, pageProps), [prop, pageProps]);

export const resolveDynamicProp = <PageProps extends SharedPageProps, T>(
  prop: T | ((props: PageProps) => T),
  pageProps: PageProps,
) => (prop instanceof Function ? prop(pageProps) : prop);
