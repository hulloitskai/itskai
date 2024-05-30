import type { FC, PropsWithChildren } from "react";
import type { Page } from "@inertiajs/core";
import type { SharedPageProps } from "~/helpers/inertia";

import AppMantineProvider from "./AppMantineProvider";
import ApolloProvider from "./ApolloProvider";
import AppProgress from "./AppProgress";

export type AppWrapperProps = PropsWithChildren<{
  initialPage: Page<SharedPageProps>;
}>;

const AppWrapper: FC<AppWrapperProps> = ({ initialPage, children }) => (
  <ApolloProvider initialCSRFToken={initialPage.props.csrf.token}>
    <AppMantineProvider>
      <AppProgress />
      {children}
    </AppMantineProvider>
  </ApolloProvider>
);

export default AppWrapper;
