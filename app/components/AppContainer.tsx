import type { FC, PropsWithChildren } from "react";
import type { Page } from "@inertiajs/core";
import type { SharedPageProps } from "~/helpers/inertia";

import AppProgress from "./AppProgress";
import MantineProvider from "./MantineProvider";
import ApolloProvider from "./ApolloProvider";

export type AppContainerProps = PropsWithChildren<{
  readonly initialPage: Page<SharedPageProps>;
}>;

const AppContainer: FC<AppContainerProps> = ({ initialPage, children }) => (
  <ApolloProvider csrfToken={initialPage.props.csrf.token}>
    <MantineProvider>
      {children}
      <AppProgress />
    </MantineProvider>
  </ApolloProvider>
);

export default AppContainer;
