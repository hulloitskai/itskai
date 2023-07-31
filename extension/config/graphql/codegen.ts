import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "config/graphql/schema.generated.graphql",
  documents: ["app/queries/*.graphql"],
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
};

export default config;
