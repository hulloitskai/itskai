# itskai

_kai's personal website :)_

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

- [ ] set up dev env with devcontainers
- [ ] set up deployment to a gcp instance with kamal
  - https://medium.com/@siddarthcee/deploying-on-gcp-with-kamal-rails-7-postgres-99e15671e839
- [x] switch to [microsoft clarity](https://clarity.microsoft.com) cuz it's
      free
- [x] lowercase preview text in emails
- [x] allow location access by password using query params
- [x] fix css shorthand processing in premailer
- [x] remove graphql
- [x] update sentry & fullstory user after login (through AppLayout)
