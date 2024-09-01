# syntax = docker/dockerfile:1.2

# == System
FROM debian:bookworm-slim AS sys
ENV OVERMIND_VERSION=2.5.1
ENV STARSHIP_VERSION=1.20.1
ENV DEVTOOLS="vim less"
ENV APPLICATION_DEPS="libimage-exiftool-perl libvips ffmpeg"

# Configure workdir
WORKDIR /app

# Ensure packages are cached
RUN rm /etc/apt/apt.conf.d/docker-clean

# Install runtime programs and dependencies
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  apt-get update -yq && \
  echo "ca-certificates tmux $DEVTOOLS $APPLICATION_DEPS" | xargs apt-get install -yq --no-install-recommends && \
  truncate -s 0 /var/log/*log

# Install Ruby and Bundler
COPY .ruby-version ./
ENV LANG=C.UTF-8 GEM_HOME=/usr/local/bundle
ENV BUNDLE_SILENCE_ROOT_WARNING=1 BUNDLE_APP_CONFIG="$GEM_HOME" PATH="$GEM_HOME/bin:$PATH"
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="git curl build-essential zlib1g-dev libssl-dev libgmp-dev libyaml-dev libjemalloc-dev" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  git clone --depth 1 https://github.com/rbenv/ruby-build.git && \
  PREFIX=/tmp ./ruby-build/install.sh && \
  mkdir -p "$GEM_HOME" && chmod 1777 "$GEM_HOME" && \
  RUBY_CONFIGURE_OPTS=--with-jemalloc /tmp/bin/ruby-build "$(cat .ruby-version)" /usr/local && \
  rm -rf ./ruby-build /tmp/* && \
  ruby --version && gem --version && bundle --version && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# Install NodeJS and Yarn
COPY .node-version ./
ENV NODE_ENV=production
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="git curl" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  git clone --depth 1 https://github.com/nodenv/node-build.git && \
  PREFIX=/tmp ./node-build/install.sh && \
  /tmp/bin/node-build "$(cat .node-version)" /usr/local && \
  npm install --global yarn && \
  npm cache clean --force && \
  rm -rf ./node-build /tmp/* && \
  node --version && npm --version && yarn --version && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# Install Python and Poetry
COPY .python-version ./
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="git curl build-essential zlib1g-dev libssl-dev" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  git clone --depth 1 --no-checkout https://github.com/pyenv/pyenv.git && \
  cd pyenv && git sparse-checkout set ./plugins/python-build && \
  git checkout && cd .. && \
  mv ./pyenv/plugins/python-build ./python-build && rm -r ./pyenv && \
  PREFIX=/tmp ./python-build/install.sh && \
  PYTHON_CONFIGURE_OPTS=--enable-shared /tmp/bin/python-build "$(cat .python-version)" /usr/local && \
  pip3 install --no-cache-dir poetry && \
  rm -rf ./python-build /tmp/* && \
  python3 --version && pip3 --version && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# Install Overmind
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="curl" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  curl -Lo /usr/bin/overmind.gz https://github.com/DarthSim/overmind/releases/download/v$OVERMIND_VERSION/overmind-v$OVERMIND_VERSION-linux-amd64.gz && \
  gzip -d /usr/bin/overmind.gz && \
  chmod u+x /usr/bin/overmind && \
  overmind --version && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# Configure shell
ENV SHELL=/bin/bash
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="curl" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  curl -sS https://starship.rs/install.sh | sh -s -- -y -v="v$STARSHIP_VERSION" && \
  starship --version && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log
COPY .bash_profile .inputrc /root/
COPY starship.toml /root/.config/starship.toml

# == Playwright
FROM sys AS sys-playwright
ENV PLAYWRIGHT_VERSION=1.45

# Install Playwright
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked \
  set -eux && \
  yarn global add playwright@$PLAYWRIGHT_VERSION; \
  playwright --version && \
  playwright install --with-deps chromium && \
  apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# == Dependencies
FROM sys-playwright AS deps

# Install Ruby dependencies
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_WITHOUT="development test"
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="build-essential libffi-dev libreadline-dev libjemalloc-dev libpq-dev" \
  RUNTIME_DEPS="libyaml-0-2 libjemalloc2 libpq5" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS $RUNTIME_DEPS | xargs apt-get install -yq --no-install-recommends; \
  bundle install && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# Install NodeJS dependencies
COPY package.json yarn.lock ./
ENV NODE_ENV=production
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked \
  yarn install

# Install Python dependencies
COPY pyproject.toml poetry.toml poetry.lock ./
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="build-essential" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  poetry install --no-cache --no-root --no-directory --without=dev && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  truncate -s 0 /var/log/*log

# == Application
FROM deps AS app
ENV PORT=3000

# Copy application code
COPY . ./

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile --gemfile app/ lib/

# Configure application environment
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true MALLOC_CONF="dirty_decay_ms:1000,narenas:2,background_thread:true"

# Precompile assets
RUN SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

# Install Python scripts
RUN --mount=type=cache,target=/usr/local/share/.cache/pypoetry,sharing=locked \
  poetry install --only-root

# Expose ports
EXPOSE ${PORT}

# Configure healthcheck
HEALTHCHECK --interval=15s --timeout=2s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:${PORT}/status

# Set entrypoint and default command
CMD [ "bin/run" ]
