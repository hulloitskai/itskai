export default {
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,css,md,html,json,yaml,yml}":
    "yarn --silent prettier --list-different",
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,graphql}": () => "echo 'should lint'",
  "*.{ts,tsx,cts,mts}": () => "echo 'should typecheck'",
};
