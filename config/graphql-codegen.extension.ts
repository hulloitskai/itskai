import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "extension/app/graphql/schema.generated.graphql",
  documents: ["extension/app/queries/*.graphql"],
  generates: {
    "extension/app/queries/types.generated.ts": {
      config: {
        scalars: {
          DateTime: "string",
          Date: "string",
        },
      },
      plugins: ["typescript"],
    },
    "extension/app/queries/operations.generated.ts": {
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
    "extension/app/helpers/apollo/introspection.generated.ts": {
      plugins: ["fragment-matcher"],
    },
    "extension/app/helpers/apollo/clientHelpers.generated.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
};

export default config;
