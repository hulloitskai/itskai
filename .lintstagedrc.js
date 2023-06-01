export default {
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,css,md,html,json,yaml,yml}":
    "yarn --silent prettier --list-different",
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,graphql}": "yarn --silent eslint",
  "*.{ts,tsx,cts,mts}": () => "yarn --silent tsc",
  "*.{rb,rbi}": [
    () => "bundle exec srb tc",
    "bundle exec rubocop --force-exclusion",
  ],
};
