# Configure base image
FROM homebrew/brew:4.1.21

# Configure workdir and env
WORKDIR /app
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true NODE_ENV=$RAILS_ENV
ENV BUNDLE_WITHOUT="development test" PYTHON_CONFIGURE_OPTS="--enable-shared"

# Install Homebrew packages
COPY --chown=linuxbrew Brewfile ./
RUN brew bundle && brew cleanup

# Configure shell
RUN mv "$HOME/.bashrc" "$HOME/.bashrc.orig"
COPY --chown=linuxbrew .bashrc .inputrc /home/linuxbrew/
COPY --chown=linuxbrew starship.toml /home/linuxbrew/.config/starship.toml
SHELL ["/bin/bash", "--login", "-c"]

# Configure languages
COPY --chown=linuxbrew .ruby-version .python-version .node-version ./

# Install Ruby and Bundler
# ENV LANG=C.UTF-8 BUNDLE_JOBS=4 BUNDLE_RETRY=3 BUNDLE_APP_CONFIG=.bundle
RUN rbenv install

# Install NodeJS and Yarn
RUN nodenv install && npm install -g yarn

# Install Playwright
RUN yarn global add playwright && playwright install --with-deps

# Install Python and Poetry
RUN pyenv install && pip3 install poetry

# Install Ruby dependencies
COPY --chown=linuxbrew Gemfile Gemfile.lock ./
RUN bundle install --no-cache

# Install NodeJS dependencies
COPY --chown=linuxbrew package.json yarn.lock ./
RUN yarn install && yarn cache clean

# Install Python dependencies
COPY --chown=linuxbrew pyproject.toml poetry.toml poetry.lock ./
RUN poetry install --no-root --no-cache --without=dev

# Copy application code
COPY --chown=linuxbrew . ./

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile --gemfile app/ lib/

# Precompile assets
RUN bundle exec rails assets:precompile RAILS_SECRET_KEY_BASE=dummy

# Expose ports
EXPOSE 3000

# Configure healthcheck
HEALTHCHECK --interval=15s --timeout=2s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/status

# Set entrypoint and default command
ENTRYPOINT [ "bash", "--login", "-c" ]
CMD [ "bin/run" ]
