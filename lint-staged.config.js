module.exports = {
  "*.{js,jsx,ts,tsx,css,md,html,json,yaml,yml}":
    "yarn --silent prettier --list-different",
  "*.{js,jsx,ts,tsx}": "yarn --silent eslint",
  "*.{ts,tsx,cts,mts}": () => "yarn --silent tsc --noEmit",
  "*.{rb,rbi}": [
    () => "bundle exec srb tc",
    "bundle exec rubocop --force-exclusion",
  ],
};
