import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  generates: {
    "./db/graphql/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
