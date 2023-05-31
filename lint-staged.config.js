export default {
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,css,md,html,json,yaml,yml}":
    "yarn --silent prettier --list-different",
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,graphql}": "yarn --silent eslint",
  "!(extension)/**/*.{ts,tsx,cts,mts}": () => "yarn --silent tsc --noEmit",
  "extension/**/*.{ts,tsx,cts,mts}": () =>
    "yarn --silent tsc --noEmit -p extension",
  "*.{rb,rbi}": [
    () => "bundle exec srb tc",
    "bundle exec rubocop --force-exclusion",
  ],
};
