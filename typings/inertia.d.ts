import type { ReactComponent, ReactElement } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type PageComponent<P = {}> = ReactComponent<P> & {
    layout?: ((page: ReactElement) => ReactElement) | null;
  };
}

// declare module "@inertiajs/inertia-react" {
//   type InertiaHeadProps = PropsWithChildren<{ title?: string }>;
//   type InertiaHead = FC<InertiaHeadProps>;

//   export const Head: InertiaHead;
// }
