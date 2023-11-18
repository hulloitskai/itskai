import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  projects: {
    schema: {
      schema: "http://localhost:3000/graphql",
      extensions: {
        codegen: {
          generates: {
            "graphql/schema.graphql": {
              plugins: ["schema-ast"],
            },
          },
        },
      },
    },
    helpers: {
      schema: "graphql/schema.graphql",
      documents: ["app/queries/*.graphql"],
      extensions: {
        codegen: {
          generates: {
            "app/helpers/graphql/types.generated.ts": {
              config: {
                scalars: {
                  DateTime: "string",
                  Date: "string",
                },
              },
              plugins: ["typescript"],
            },
            "app/helpers/graphql/operations.generated.ts": {
              preset: "import-types",
              config: {
                avoidOptionals: {
                  field: true,
                },
                omitOperationSuffix: true,
                preResolveTypes: false,
              },
              plugins: ["typescript-operations", "typed-document-node"],
              presetConfig: {
                typesPath: "./types.generated",
              },
            },
            "app/helpers/apollo/introspection.generated.ts": {
              plugins: ["fragment-matcher"],
            },
            "app/helpers/apollo/clientHelpers.generated.ts": {
              plugins: ["typescript-apollo-client-helpers"],
            },
          },
        },
      },
    },
  },
};

export default config;
