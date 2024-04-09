# syntax = docker/dockerfile:1.2

# Configure base image
FROM debian:bookworm-slim

# Configure workdir
WORKDIR /app

# Ensure packages are cached
RUN rm /etc/apt/apt.conf.d/docker-clean

# Install build dependencies
RUN --mount=type=cache,target=/var/cache/apt/lists,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  apt-get -y update -q \
  && apt-get install -yq --no-install-recommends --no-install-suggests curl tmux git build-essential ca-certificates libyaml-dev libssl-dev libffi-dev libreadline-dev zlib1g-dev libjemalloc-dev \
  && truncate -s 0 /var/log/*log

# Install NodeJS and Yarn
COPY .node-version ./
RUN git clone --depth 1 https://github.com/nodenv/node-build.git \
  && PREFIX=/tmp ./node-build/install.sh \
  && /tmp/bin/node-build "$(cat .node-version)" /usr/local \
  && npm install --global yarn \
  && npm cache clean --force \
  && rm -rf ./node-build /tmp/* \
  && node --version && npm --version && yarn --version

# Install Python and Poetry
COPY .python-version ./
RUN git clone --depth 1 --no-checkout https://github.com/pyenv/pyenv.git \
  && cd pyenv && git sparse-checkout set ./plugins/python-build \
  && git checkout && cd .. \
  && mv ./pyenv/plugins/python-build ./python-build && rm -r ./pyenv \
  && PREFIX=/tmp ./python-build/install.sh \
  && PYTHON_CONFIGURE_OPTS=--enable-shared /tmp/bin/python-build "$(cat .python-version)" /usr/local \
  && pip3 install --no-cache-dir poetry \
  && rm -rf ./python-build /tmp/* \
  && python3 --version && pip3 --version

# Install Ruby and Bundler
COPY .ruby-version ./
ENV LANG=C.UTF-8 GEM_HOME=/usr/local/bundle
ENV BUNDLE_SILENCE_ROOT_WARNING=1 BUNDLE_APP_CONFIG="$GEM_HOME" PATH="$GEM_HOME/bin:$PATH"
RUN git clone --depth 1 https://github.com/rbenv/ruby-build.git \
  && PREFIX=/tmp ./ruby-build/install.sh \
  && mkdir -p "$GEM_HOME" && chmod 1777 "$GEM_HOME" \
  && RUBY_CONFIGURE_OPTS=--with-jemalloc /tmp/bin/ruby-build "$(cat .ruby-version)" /usr/local \
  && rm -rf ./ruby-build /tmp/* \
  && ruby --version && gem --version && bundle --version

# Install runtime dependencies
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  apt-get -y update -q \
  && apt-get install -yq --no-install-recommends --no-install-suggests libpq-dev libimage-exiftool-perl libvips ffmpeg \
  && truncate -s 0 /var/log/*log

# Install Overmind
RUN curl -Lo /usr/bin/overmind.gz https://github.com/DarthSim/overmind/releases/download/v2.4.0/overmind-v2.4.0-linux-amd64.gz \
  && gzip -d /usr/bin/overmind.gz \
  && chmod u+x /usr/bin/overmind

# Install Playwright
RUN yarn global add playwright \
  && playwright install --with-deps chromium \
  && yarn cache clean

# Install Python dependencies
COPY pyproject.toml poetry.toml poetry.lock ./
RUN poetry install --no-cache --without=dev

# Install Ruby dependencies
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_WITHOUT="development test"
RUN bundle install --no-cache

# Install NodeJS dependencies
COPY package.json yarn.lock ./
ENV NODE_ENV=production
RUN yarn install --production && yarn cache clean

# Install devtools
RUN --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  --mount=type=cache,target=/var/cache/apt,sharing=locked \
  apt-get -y update -q \
  && apt-get install -yq --no-install-recommends --no-install-suggests vim less \
  && truncate -s 0 /var/log/*log

# Configure shell
ENV SHELL=/bin/bash
RUN curl -sS https://starship.rs/install.sh | sh -s -- -y
COPY .bash_profile .inputrc /root/
COPY starship.toml /root/.config/starship.toml

# Configure application environment
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true MALLOC_CONF="dirty_decay_ms:1000,narenas:2,background_thread:true"

# Copy application code
COPY . ./

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile --gemfile app/ lib/

# Precompile assets
RUN RAILS_SECRET_KEY_BASE=dummy bundle exec rails assets:precompile

# Install Python scripts
RUN poetry install --no-cache --without=dev

# Expose ports
EXPOSE 3000

# Configure healthcheck
HEALTHCHECK --interval=15s --timeout=2s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/status

# Set entrypoint and default command
CMD [ "bin/run" ]
