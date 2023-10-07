import type { PageComponent } from "~/helpers/inertia";
import type { PageProps } from "@inertiajs/core";

import GraphiQL from "graphiql";
import { parse } from "graphql";
import { ApolloLink } from "@apollo/client";

import AppMeta from "~/components/AppMeta";
import PageLayout from "~/components/PageLayout";

import "graphiql/graphiql.css";
import "./GraphiQLPage.css";

export type GraphiQLPageProps = PageProps;

const GraphiQLPage: PageComponent<GraphiQLPageProps> = () => {
  const client = useApolloClient();
  return (
    <GraphiQL
      fetcher={async ({ query, variables, operationName }, options) => {
        const parsedQuery = parse(query);
        return ApolloLink.execute(client.link, {
          query: parsedQuery,
          variables,
          operationName: operationName ?? undefined,
          context: {
            headers: options?.headers,
          },
        }) as any;
      }}
    />
  );
};

GraphiQLPage.layout = page => (
  <PageLayout>
    <AppMeta title="GraphiQL" noIndex />
    {page}
  </PageLayout>
);

export default GraphiQLPage;
