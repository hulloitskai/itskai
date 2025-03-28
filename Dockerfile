# syntax = docker/dockerfile:1.2
# check=error=true

# == System
# NOTE: We separate system dependencies from application dependencies (see
# base layer) to speed up builds when only application dependencies change.
FROM debian:bookworm-slim AS system
ENV OVERMIND_VERSION=2.5.1
ENV STARSHIP_VERSION=1.20.1
ENV DEVTOOLS="vim less"
ENV LIBRARIES="libimage-exiftool-perl libvips"

# Configure workdir
WORKDIR /app

# Ensure packages are cached
RUN rm /etc/apt/apt.conf.d/docker-clean

# Install runtime programs and dependencies
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  apt-get update -yq && \
  echo "ca-certificates tmux $DEVTOOLS $LIBRARIES" | xargs apt-get install -yq --no-install-recommends && \
  apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false llvm && \
  rm -r /var/log/* && \
  tmux -V

# Install Ruby and Bundler
COPY .ruby-version ./
ENV LANG=C.UTF-8 GEM_HOME=/usr/local/bundle
ENV BUNDLE_SILENCE_ROOT_WARNING=1 BUNDLE_APP_CONFIG="$GEM_HOME" BUNDLE_PATH="/usr/local/bundle" BUNDLE_DEPLOYMENT="1" PATH="$GEM_HOME/bin:$PATH"
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="git curl build-essential zlib1g-dev libssl-dev libgmp-dev libyaml-dev libjemalloc-dev" set -eux && \
  RUNTIME_DEPS="libyaml-0-2 libjemalloc2" && \
  apt-get update -yq && \
  echo $BUILD_DEPS $RUNTIME_DEPS | xargs apt-get install -yq --no-install-recommends; \
  git clone --depth 1 https://github.com/rbenv/ruby-build.git && \
  PREFIX=/tmp ./ruby-build/install.sh && \
  mkdir -p "$GEM_HOME" && chmod 1777 "$GEM_HOME" && \
  RUBY_CONFIGURE_OPTS=--with-jemalloc /tmp/bin/ruby-build "$(cat .ruby-version)" /usr/local && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r ./ruby-build /tmp/* /var/log/* && \
  ruby --version && gem --version && bundle --version

# Install NodeJS
COPY .node-version ./
ENV NODE_ENV=production
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="git curl" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  git clone --depth 1 https://github.com/nodenv/node-build.git && \
  PREFIX=/tmp ./node-build/install.sh && \
  /tmp/bin/node-build "$(cat .node-version)" /usr/local && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r ./node-build /var/log/* && \
  node --version && npm --version

# Install Python and Poetry
COPY .python-version ./
ENV POETRY_VIRTUALENVS_CREATE=false
RUN --mount=type=cache,target=/var/cache,sharing=locked \
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
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r ./python-build /tmp/* /var/log/* && \
  find /usr/local -depth \( \( -type d -a \( -name test -o -name tests -o -name idle_test \) \) -o \( -type f -a \( -name '*.pyc' -o -name '*.pyo' -o -name 'libpython*.a' \) \) \) -exec rm -rf '{}' + && \
  python3 --version && pip3 --version

# Install Overmind
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="curl" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  curl -Lo /usr/bin/overmind.gz https://github.com/DarthSim/overmind/releases/download/v$OVERMIND_VERSION/overmind-v$OVERMIND_VERSION-linux-amd64.gz && \
  gzip -d /usr/bin/overmind.gz && \
  chmod u+x /usr/bin/overmind && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r /var/log/* && \
  overmind --version

# Configure shell
ENV SHELL=/bin/bash
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="curl" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  curl -sS https://starship.rs/install.sh | sh -s -- -y -v="v$STARSHIP_VERSION" && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r /tmp/* /var/log/* && \
  starship --version
COPY .bash_profile .inputrc /root/
COPY starship.toml /root/.config/starship.toml

# == System with Playwright
FROM system AS system-with-playwright
ENV PLAYWRIGHT_VERSION=1.45

# Install Playwright
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  --mount=type=cache,target=/root/.npm,sharing=locked \
  set -eux && \
  npm install -g playwright@$PLAYWRIGHT_VERSION && \
  playwright install --with-deps chromium && \
  apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r /var/log/* && \
  playwright --version


# == Base (without built assets)
FROM system-with-playwright AS base

# Install Ruby dependencies
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_WITHOUT="development test"
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  BUILD_DEPS="build-essential libreadline-dev libyaml-dev libjemalloc-dev libpq-dev git" \
  RUNTIME_DEPS="libpq5" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS $RUNTIME_DEPS | xargs apt-get install -yq --no-install-recommends; \
  BUNDLE_IGNORE_MESSAGES=1 bundle install && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r /var/log/* && \
  rm -r /root/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
  find "${BUNDLE_PATH}"/ruby/*/bundler/gems/ -name "*.c" -delete && \
  find "${BUNDLE_PATH}"/ruby/*/bundler/gems/ -name "*.o" -delete && \
  bundle exec bootsnap precompile --gemfile

# Install Python dependencies
COPY pyproject.toml poetry.toml poetry.lock ./
RUN --mount=type=cache,target=/var/cache,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  --mount=type=cache,target=/root/.cache/pypoetry,sharing=locked \
  BUILD_DEPS="build-essential" set -eux && \
  apt-get update -yq && \
  echo $BUILD_DEPS | xargs apt-get install -yq --no-install-recommends; \
  poetry install --no-cache --no-root --no-directory --without=dev && \
  echo $BUILD_DEPS | xargs apt-get purge -yq --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
  rm -r /var/log/*


# == Builder
FROM base AS builder

# Install NodeJS dependencies
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm,sharing=locked npm install

# Copy application code
COPY . ./

# Build assets
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
  SECRET_KEY_BASE_DUMMY=1 RAILS_ENV=production bin/rails assets:precompile


# == Application
FROM base AS app
ENV RAILS_PORT=3000

# Copy application code
COPY . ./

# Copy built assets
COPY --from=builder /app/dist/ssr ./dist/ssr
COPY --from=builder /app/public/dist ./public/dist

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Configure application environment
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true MALLOC_CONF="dirty_decay_ms:1000,narenas:2,background_thread:true"

# Install Python scripts
RUN --mount=type=cache,target=/usr/local/share/.cache/pypoetry,sharing=locked \
  poetry install --only-root

# Expose ports
EXPOSE ${RAILS_PORT}

# Configure healthcheck
HEALTHCHECK --interval=15s --timeout=2s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:${RAILS_PORT}/up

# Set entrypoint and default command
CMD [ "bin/run" ]
