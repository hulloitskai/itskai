import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["app/views/**/*.graphql"],
  generates: {
    "./app/views/shared/helpers/apollo-generated.ts": {
      config: {
        omitOperationSuffix: true,
      },
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
    "./app/graphql/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
