import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["app/queries/*.graphql"],
  generates: {
    "./app/queries/index.ts": {
      schema: "app/graphql/schema.graphql",
      config: {
        omitOperationSuffix: true,
      },
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
    "./app/graphql/schema.graphql": {
      schema: "http://localhost:3000/api/graphql",
      plugins: ["schema-ast"],
    },
  },
};

export default config;
