# Declare arguments, with default values.
ARG DISTRO_NAME=bullseye
ARG RUBY_VERSION=3.1.2
ARG NODE_VERSION=16
ARG YARN_VERSION=1.22.17
ARG POSTGRES_VERSION=14
ARG OVERMIND_VERSION=2.2.2

# Configure base image.
FROM ruby:$RUBY_VERSION-slim-$DISTRO_NAME

# Re-declare arguments, since they are reset by the FROM instrucitons.
#
# See: https://github.com/moby/moby/issues/34129
ARG DISTRO_NAME
ARG RUBY_VERSION
ARG NODE_VERSION
ARG YARN_VERSION
ARG POSTGRES_VERSION
ARG OVERMIND_VERSION

# Install common dependencies.
RUN apt-get update -qq \
    && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends build-essential gnupg2 curl less git \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && truncate -s 0 /var/log/*log

# Install Postgres client.
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && echo deb http://apt.postgresql.org/pub/repos/apt/ $DISTRO_NAME-pgdg main $POSTGRES_VERSION > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update -qq \
    && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends libpq-dev postgresql-client-$POSTGRES_VERSION \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && truncate -s 0 /var/log/*log

# Install NodeJS and Yarn.
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
RUN apt-get update -qq \
    && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && truncate -s 0 /var/log/*log
RUN npm install -g yarn@$YARN_VERSION

# Install Overmind.
RUN curl -Lo /usr/local/bin/overmind.gz https://github.com/DarthSim/overmind/releases/download/v$OVERMIND_VERSION/overmind-v$OVERMIND_VERSION-linux-amd64.gz \
    && gzip -d /usr/local/bin/overmind.gz \
    && chmod u+x /usr/local/bin/overmind

# Install system dependencies and utils.
COPY Aptfile /tmp/Aptfile
RUN apt-get update -qq \
    && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
    && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends $(grep -Ev '^\s*#' /tmp/Aptfile | xargs) \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && truncate -s 0 /var/log/*log

# Install bundler.
ENV LANG=C.UTF-8 BUNDLE_JOBS=4 BUNDLE_RETRY=3 BUNDLE_APP_CONFIG=.bundle
RUN gem update --system \
    && gem install bundler

# Copy application code to /app.
WORKDIR /app
COPY ./ ./

# Install application dependencies.
RUN bundle config set --local without 'development test' \
    && bundle install

# Install Starship.
COPY starship.toml /root/.config/starship.toml
RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes

# Configure shell.
COPY .zshrc /tmp/.zshrc
RUN echo >> ~/.zshrc \
    && cat /tmp/.zshrc >> ~/.zshrc \
    && chsh -s /bin/zsh \
    && rm -rf /tmp/*

# Configure environment.
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true

# Precompile assets.
RUN bin/rails assets:precompile RAILS_SECRET_KEY_BASE=dummy

# Configure exposed ports.
EXPOSE 3000

# Configure healthcheck.
HEALTHCHECK --interval=10s --timeout=1s --start-period=15s --retries=3 CMD curl -f http://${HOST}:${PORT}/internal/status || exit 1

# Configure entrypoint.
ENTRYPOINT [ "/app/bin/run" ]
