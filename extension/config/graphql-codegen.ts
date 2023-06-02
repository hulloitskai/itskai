import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.generated.graphql",
  documents: ["queries/*.graphql"],
  generates: {
    "src/helpers/graphql/types.generated.ts": {
      config: {
        scalars: {
          DateTime: "string",
          Date: "string",
        },
      },
      plugins: ["typescript"],
    },
    "src/helpers/graphql/operations.generated.ts": {
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
    "src/helpers/apollo/introspection.generated.ts": {
      plugins: ["fragment-matcher"],
    },
    "src/helpers/apollo/clientHelpers.generated.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
};

export default config;
