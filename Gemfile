source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.3", ">= 7.0.3.1"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 6.0"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails", "~> 3.4"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"
gem "ruby-vips", "~> 2.1", require: false

# Use S3 as the backend for Active Storage
gem "aws-sdk-s3", "~> 1.117", require: false

# Use Good Job as the backend for Active Job
gem "good_job", "~> 3.6"

# Use Mailjet to send emails.
gem "mailjet", "~> 1.7"

# Use FriendlyId to create human-friendly identifiers for models
gem "friendly_id", "~> 5.4"

# Use Nanoid to generate tiny collision-resistant IDs
gem "nanoid", "~> 2.0"

# Perform HTTP requests with HTTParty
gem "httparty", "~> 0.20.0"

# Use Honeybadger for error reporting
gem "honeybadger", "~> 4.12"
gem "binding_of_caller"

# Show a healthcheck route
gem "rails-healthcheck"

# Silence logs from certain actions
gem "silencer", "~> 2.0", require: false

# Validate emails, phone numbers, dates, arrays, and more
gem "can_has_validations", "~> 1.6"
gem "email_validator", "~> 2.2"
gem "phonelib", "~> 0.6.55"
gem "validate_url", "~> 1.0"
gem "date_validator", "~> 0.12.0"
gem "active_storage_validations", "~> 0.9.6"

# Debug code and inspect values at runtime
# See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
gem "debug", platforms: %i[mri mingw x64_mingw]
gem "pry"
gem "pry-rails"
gem "pry-doc", require: false
gem "pry-sorbet", require: false
gem "pry-stack_explorer", require: false
gem "break", require: false

# Load environment variables from .env
gem "dotenv", "~> 2.7", require: false

# Parse and manipulate URIs
gem "addressable", "~> 2.8"

# Handle soft deletions with Discard
gem "discard", "~> 1.2"

# Manage meta tags
gem "meta-tags", "~> 2.16"

# Typecheck code at runtime
gem "sorbet-runtime", "~> 0.5.10554"

# Use Enumerize to enumerate attributes
gem "enumerize", "~> 2.5"

# Use Action Policy to authorize actions
gem "action_policy", "~> 0.6.3"
gem "action_policy-graphql", "~> 0.5.3"

# Expose a GraphQL API
gem "graphql", "~> 2.0"
gem "graphql-persisted_queries", "~> 1.6"
gem "graphql-rails_logger"
gem "graphiql-rails"

# Serve and bundle frontend with Vite
gem "vite_rails", "~> 3.0"

# Use Inertia framework for server-driven SPAs
gem "inertia_rails", "~> 3.0"

# Use Premailer to inline CSS into email templates
gem "premailer-rails", "~> 1.11"

# Parse YAML files with Psych
gem "psych", "~> 4.0"

# Parse front matter from text files.
gem "front_matter_parser", "~> 1.0"

# Authenticate users with Devise
gem "devise", "~> 4.8"

# Use OmniAuth to authenticate with external providers (i.e. Spotify)
gem "omniauth", "~> 2.1"
gem "omniauth-rails_csrf_protection", "~> 1.0"
gem "omniauth-spotify", "~> 0.0.13"

# Use RSpotify to read currently playing data from Spotify
gem "rspotify", "~> 2.11"

# Call Python from Ruby
gem "pycall", "~> 1.4"

# Print objects with text wrappers for debugging
gem "wrapped_print"

# Enable additional operators and utilities for Active Record with PostgreSQL
gem "active_record_extended", "~> 2.1"

# Parse Markdown with Markly.
gem "markly", "~> 0.7.0"

group :development, :test do
  # Auto-detect and warn about N+1 queries
  gem "bullet"

  # Generate JavaScript path helpers
  gem "js_from_routes", "~> 2.0"
end

group :development do
  # Detect file changes for live reload
  gem "listen", "~> 3.7"

  # Typecheck code
  gem "sorbet", "~> 0.5.10554", require: false
  gem "tapioca", "~> 0.10.3", require: false

  # Use Rubocop to lint code
  gem "rubocop", "~> 1.39", require: false
  gem "rubocop-graphql", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-shopify", require: false
  gem "rubocop-sorbet", require: false
  gem "ruby-lsp", require: false
  gem "parser", "~> 3.1.2.1", require: false

  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"
  # gem "memory_profiler"
  # gem "stackprof"

  # Display better error pages during development
  gem "better_errors"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  gem "spring"

  # Annotate models and routes
  gem "annotate", require: false
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
