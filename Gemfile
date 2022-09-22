source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.3", ">= 7.0.3.1"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.2"
gem "ruby-vips", "~> 2.1", require: false

# Use S3 as the backend for Active Storage
gem "aws-sdk-core", require: false
gem "aws-sdk-s3", "~> 1.113", require: false

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Use Responders to DRY up controller responders
gem "responders", github: "heartcombo/responders"

# Use Good Job as the backend for Active Job
gem "good_job", "~> 3.1"

# Use Mailgun to send emails.
gem "mailgun-ruby", "~> 1.2"

# Perform HTTP requests with HTTParty
gem "httparty", "~> 0.20.0"

# Bundle javascript with Webpack
gem "shakapacker", "= 6.5"

# Render React components in Rails templates
gem "react_on_rails", "= 13.1"

# Use Honeybadger for error reporting
gem "honeybadger", "~> 4.12"
gem "binding_of_caller"

# Show a healthcheck route
gem "rails-healthcheck"
gem "silencer", "~> 2.0.0", require: false

# Debug code and inspect values at runtime
# See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
gem "debug", platforms: %i[ mri mingw x64_mingw ]
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

# Typecheck code at runtime
gem "sorbet-runtime", "~> 0.5.10417"

# Use Enumerize to enumerate attributes
gem "enumerize", "~> 2.5"

# Use Action Policy to authorize actions
gem "action_policy", "~> 0.6.3"
gem "action_policy-graphql", "~> 0.5.3"

group :development, :test do
  # Auto-detect and warn about N+1 queries
  gem "bullet"
end

group :development do
  # Detect file changes for live reload
  gem "listen", "~> 3.7"

  # Typecheck code
  gem "sorbet", "~> 0.5.10262", require: false
  gem "spoom", require: false
  gem "tapioca", "~> 0.10.0", require: false

  # Use Rubocop to lint code
  gem "rubocop", "~> 1.32", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-shopify", require: false
  gem "rubocop-sorbet", require: false
  gem "ruby-lsp", require: false

  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  gem "rack-mini-profiler"
  gem "memory_profiler"
  gem "stackprof"

  # Display a better error page during development
  gem "better_errors"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"

  # Annotate models and routes
  gem "annotate", require: false
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
