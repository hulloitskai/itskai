import type { FC, PropsWithChildren } from "react";
import type { Page } from "@inertiajs/core";
import type { SharedPageProps } from "~/helpers/inertia";

import AppMantineProvider from "./AppMantineProvider";
import ApolloProvider from "./ApolloProvider";
import AppProgress from "./AppProgress";

export type AppWrapperProps = PropsWithChildren<{
  readonly initialPage: Page<SharedPageProps>;
}>;

const AppWrapper: FC<AppWrapperProps> = ({
  initialPage: { props },
  children,
}) => (
  <ApolloProvider csrfToken={props.csrf.token}>
    <AppMantineProvider>
      <AppProgress />
      {children}
    </AppMantineProvider>
  </ApolloProvider>
);

export default AppWrapper;
