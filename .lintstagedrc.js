export default {
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,css,md,html,json,yaml,yml}":
    "prettier --list-different",
  "*.{js,mjs,cjs,jsx,ts,cts,mts,tsx,graphql}":
    "eslint --cache --cache-location tmp/cache/eslint/ --report-unused-disable-directives",
  "*.{ts,tsx,cts,mts}": () => "tsc",
  "*.{rb,rbi}": [() => "bin/srb typecheck", "bin/rubocop --force-exclusion"],
};
