# itskai

_Kai's personal website._

## Setup

```bash
# Install tools
brew install docker rbenv nodenv pyenv yarn watchman overmind

# Set up environment
git clone git@github.com:hulloitskai/itskai
cd itskai
bin/setup
```

## TODO

- [ ] Import journal entries from Notion into application database
- [ ] Set up `extension` subproject to automatically generate GraphQL client
      helpers from `extension/schema.generated.graphql`,
- [ ] Switch to [Microsoft Clarity](https://clarity.microsoft.com) cuz it's
      free.
- [x] Upgrade to Vite 4 once https://github.com/ElMassimo/vite_ruby/issues/333
      is resolved.
