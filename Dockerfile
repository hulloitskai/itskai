# Declare arguments, with default values
ARG DISTRO_NAME=bullseye
ARG RUBY_VERSION=3.2.2
ARG PYTHON_MAJOR_VERSION=3
ARG NODE_MAJOR_VERSION=18
ARG YARN_VERSION=1.22.19
ARG POSTGRES_MAJOR_VERSION=14
ARG OVERMIND_VERSION=2.4.0

# Configure base image
FROM ruby:$RUBY_VERSION-slim-$DISTRO_NAME

# Re-declare arguments, since they are reset by the FROM instructions
#
# See: https://github.com/moby/moby/issues/34129
ARG DISTRO_NAME
ARG RUBY_VERSION
ARG PYTHON_MAJOR_VERSION
ARG NODE_MAJOR_VERSION
ARG YARN_VERSION
ARG POSTGRES_MAJOR_VERSION
ARG OVERMIND_VERSION

# Install curl
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends curl \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install Bundler
ENV LANG=C.UTF-8 BUNDLE_JOBS=4 BUNDLE_RETRY=3 BUNDLE_APP_CONFIG=.bundle
RUN gem update --system && gem install bundler

# Install NodeJS and Yarn
RUN curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR_VERSION.x | bash -
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends nodejs \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log
RUN npm install -g yarn@$YARN_VERSION

# Install Python and pip
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends python${PYTHON_MAJOR_VERSION}-dev python${PYTHON_MAJOR_VERSION}-pip \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install Overmind
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends tmux \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log \
  && curl -Lo /usr/bin/overmind.gz https://github.com/DarthSim/overmind/releases/download/v$OVERMIND_VERSION/overmind-v$OVERMIND_VERSION-linux-amd64.gz \
  && gzip -d /usr/bin/overmind.gz \
  && chmod u+x /usr/bin/overmind

# Install Postgres client
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && echo deb http://apt.postgresql.org/pub/repos/apt/ $DISTRO_NAME-pgdg main $POSTGRES_MAJOR_VERSION > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends libpq-dev postgresql-client-$POSTGRES_MAJOR_VERSION \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install Google Chrome
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get -y update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends google-chrome-stable \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install Chromedriver
RUN curl -o /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/$(google-chrome --version)/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip \
    && mv /tmp/chromedriver /usr/bin/chromedriver \
    && chmod u+x /usr/bin/chromedriver \
    && rm /tmp/*

# Install programs
COPY Aptfile /tmp/Aptfile
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends $(grep -Ev '^\s*#' /tmp/Aptfile | xargs) \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Install Starship
COPY starship.toml /root/.config/starship.toml
RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes

# Configure shell
COPY .zcustomizations .inputrc /root/
RUN echo '\n. "$HOME/.zcustomizations"' >> ~/.zshrc && chsh -s /bin/zsh

# Configure workdir and environment
WORKDIR /app
ENV BUNDLE_WITHOUT="development test" RAILS_ENV=production RAILS_LOG_TO_STDOUT=true NODE_ENV=$RAILS_ENV

# Copy dependency lists
COPY Gemfile Gemfile.lock package.json yarn.lock requirements.txt ./

# Install dependencies
RUN bundle install && yarn install && pip install -r requirements.txt

# Copy application code
COPY . ./

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile --gemfile app/ lib/

# Precompile assets
RUN bundle exec rails assets:precompile RAILS_SECRET_KEY_BASE=dummy

# Expose ports
EXPOSE 3000

# Configure healthcheck
HEALTHCHECK --interval=15s --timeout=2s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/status || exit 1

# Set command
CMD ["/app/bin/run"]
