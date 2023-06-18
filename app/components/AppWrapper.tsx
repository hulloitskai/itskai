import type { FC, PropsWithChildren } from "react";
import type { Page } from "@inertiajs/core";
import type { SharedPageProps } from "~/helpers/inertia";

import AppProgress from "./AppProgress";
import AppMantineProvider from "./AppMantineProvider";
import ApolloProvider from "./ApolloProvider";

export type AppWrapperProps = PropsWithChildren<{
  readonly initialPage: Page<SharedPageProps>;
}>;

const AppWrapper: FC<AppWrapperProps> = ({ initialPage, children }) => (
  <ApolloProvider csrfToken={initialPage.props.csrf.token}>
    <AppMantineProvider>
      {children}
      <AppProgress />
    </AppMantineProvider>
  </ApolloProvider>
);

export default AppWrapper;
