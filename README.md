# itskai

_kai's personal website :)_

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/ufbx.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

## setup

```bash
# install tools
brew install docker rbenv nodenv pyenv poetry watchman overmind

# install libraries
brew install libvips ffmpeg

# set up environment
git clone git@github.com:hulloitskai/itskai
cd itskai
bin/setup
```

## todos

- [ ] set up analytics + session replay with posthog
- [ ] set up dev env with devcontainers
- [ ] set up deployment to a gcp instance with kamal
  - https://medium.com/@siddarthcee/deploying-on-gcp-with-kamal-rails-7-postgres-99e15671e839
  - use http://ttl.sh for image registry
