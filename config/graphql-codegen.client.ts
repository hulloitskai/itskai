import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "app/graphql/schema.graphql",
  documents: ["app/queries/*.graphql"],
  generates: {
    "./app/queries/index.ts": {
      config: {
        omitOperationSuffix: true,
        avoidOptionals: {
          field: true,
        },
        scalars: {
          DateTime: "string",
          Date: "string",
        },
      },
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
    "./app/helpers/apollo/introspection.ts": {
      plugins: ["fragment-matcher"],
    },
    "./app/helpers/apollo/helpers.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
};

export default config;
