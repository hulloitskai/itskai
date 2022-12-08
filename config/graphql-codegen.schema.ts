import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  generates: {
    "./app/graphql/schema.generated.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
