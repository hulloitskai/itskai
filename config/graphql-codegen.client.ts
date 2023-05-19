import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "app/graphql/schema.generated.graphql",
  documents: ["app/queries/*.graphql"],
  generates: {
    "app/queries/types.generated.ts": {
      config: {
        scalars: {
          DateTime: "string",
          Date: "string",
        },
      },
      plugins: ["typescript"],
    },
    "app/queries/operations.generated.ts": {
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
        typesPath: "app/queries/types.generated",
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
