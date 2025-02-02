source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.4.1"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.1"

# JSON-backed, nestable models
gem "store_model", "~> 1.6"

# Use PostgreSQL as the database for Active Record
gem "pg", "~> 1.5"

# Perform full text search with Postgres
gem "pg_search", "~> 2.3"

# Use RGeo geometry types
gem "rgeo", "~> 3.0"
gem "rgeo-geojson", "~> 2.2"
gem "rgeo-activerecord", "~> 8.0"

# Enable additional operators and utilities for Active Record with PostgreSQL
gem "active_record_extended", github: "GeorgeKaraszi/ActiveRecordExtended", branch: "feature/rails80"

# Use PostGIS extensions for PostgreSQL
gem "activerecord-postgis-adapter", github: "rgeo/activerecord-postgis-adapter", ref: "32d58f3d3df94779acabba3a2e510de56a2bce63"

# Use enhanced PostgreSQL adapter for Action Cable
gem "actioncable-enhanced-postgresql-adapter", "~> 1.0"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 6.6.0"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[windows jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.12"
gem "ruby-vips", "~> 2.1", require: false

# Use S3 as the backend for Active Storage
gem "aws-sdk-s3", "~> 1.126", require: false

# Use Good Job as the backend for Active Job
gem "good_job", "~> 4.7.0"

# Send emails with Mailjet
gem "mailjet", "~> 1.7"

# Use FriendlyId to create human-friendly identifiers for models
gem "friendly_id", "~> 5.5"

# Modern concurrency tools
gem "concurrent-ruby", "~> 1.1"

# Use Faraday to make HTTP requests
gem "faraday", "~> 2.10"
gem "faraday-cookie_jar", "~> 0.0.7"

# Manage cookies with HTTP::Cookie
gem "http-cookie", "~> 1.0"

# Show a healthcheck route
gem "rails-healthcheck"

# Silence logs from certain actions
gem "silencer", "~> 2.0", require: false

# Validate emails, phone numbers, dates, arrays, and more
gem "can_has_validations", "~> 1.8"
gem "email_validator", "~> 2.2"
gem "phonelib", "~> 0.6.55"
gem "validate_url", "~> 1.0"
gem "date_validator", "~> 0.12.0"
gem "active_storage_validations", "~> 0.9.6"

# Introspect program at runtime with Pry
gem "pry"
gem "pry-rails"
gem "pry-rescue"
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
gem "sorbet-runtime"

# Use Enumerize to enumerate attributes
gem "enumerize", "~> 2.6"

# Use Action Policy to authorize actions
gem "action_policy", "~> 0.6.5"

# Serve and bundle frontend with Vite
gem "vite_rails", "~> 3.0"

# Use Inertia framework for server-driven SPAs
gem "inertia_rails", "~> 3.6.0"

# Use Premailer to inline CSS into email templates
gem "premailer-rails", "~> 1.12"

# Parse YAML files with Psych
gem "psych", "~> 4.0"

# Parse front matter from text files.
gem "front_matter_parser", "~> 1.0"

# Authenticate users with Devise
gem "devise", "~> 4.9"

# Check password strength with StrongPassword
gem "strong_password", "~> 0.0.10"

# Use OmniAuth to authenticate with external providers (i.e. Spotify)
gem "omniauth", "~> 2.1"
gem "omniauth-rails_csrf_protection", "~> 1.0"
gem "omniauth-spotify", "~> 0.0.13"
gem "omniauth-google-oauth2", "~> 1.1"

# Use RSpotify to read currently playing data from Spotify
gem "rspotify", "~> 2.12"

# Parse Markdown with Markly
gem "markly", "~> 0.7.0"

# Use Sentry for error reporting
gem "sentry-rails", "~> 5.9"
gem "stackprof"

# Query Notion with Notion Ruby Client
gem "notion-ruby-client", "~> 1.2"

# Forward and reverse geocode with Geocoder
gem "geocoder", "~> 1.8"
gem "csv"

# Parse HTML with Nokogiri
gem "nokogiri", "~> 1.15"

# Run post-deploy tasks with after_party
gem "after_party", "~> 1.11"

# Handle CORS requests
gem "rack-cors", "~> 2.0"

# Hash passwords with bcrypt
gem "bcrypt", "~> 3.1"

# Control the browser with Playwright
gem "playwright-ruby-client", "~> 1.43", require: 'playwright'

# Analyze image metadata with Exiftool
gem "exiftool", "~> 1.2"

# Find timezones by coordinate with TimezoneFinder
gem "timezone_finder", "~> 1.5"

# Cache counts in models with CounterCulture
gem "counter_culture", "~> 3.5"

# Render pretty JSON
gem "neatjson", "~> 0.10.5"

# Serialize JSON with MultiJSON
gem "multi_json", "~> 1.15"

# Access YAML records
gem "frozen_record", "~> 0.27.1"

# Fast JSON serialization
gem "oj_serializers", "~> 2.0"

# Generate Typescript from serializers
gem "types_from_serializers", "~> 2.1"

# Reverse DNS / IP Lookup
gem "reversed", "~> 0.5.0"

# Paginate records with Pagy
gem "pagy", "~> 9.2"

# Send web push notifications
gem "web-push", "~> 3.0"

# Up-to-date Emoji Regex
gem "unicode-emoji", "~> 3.7", require: "unicode/emoji"

group :development, :test do
  # Debug code with debug
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[mri windows], require: 'debug/prelude'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

  # Auto-detect and warn about N+1 queries
  gem "bullet"

  # Generate Typescript path helpers
  gem "js_from_routes", "~> 4.0"

  # Use Rubocop to lint code
  gem "rubocop", "~> 1.62", require: false
  gem "rexml", ">= 3.3.6", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-shopify", require: false
  gem "rubocop-sorbet", require: false
  gem "rubocop-capybara", require: false
  gem "ruby-lsp", require: false
  gem "rbs", "~> 3.5.3", require: false
  gem "parser", "~> 3.3.0.5", require: false
end

group :development do
  # Run git hooks with Lefthook
  gem "lefthook", "~> 1.7", require: false

  # Patch-level verification for Bundler
  gem "bundler-audit", "~> 0.9.2", require: false

  # Detect file changes for live reload
  gem "listen", "~> 3.8"

  # Wipe out inconsistent DB and schema.rb when switching branches
  gem "actual_db_schema", "~> 0.7.9"

  # Rerun programs when files change
  gem "rerun", "~> 0.14.0", require: false

  # Typecheck code
  gem "sorbet", require: false
  gem "spoom", require: false
  gem "tapioca", "~> 0.16.8", require: false

  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Display better error pages during development
  gem "better_errors"

  # Annotate models and routes
  gem "annotaterb", require: false

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  gem "rack-mini-profiler"
  gem "memory_profiler"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "capybara-playwright-driver"
  gem "rack-test"
end
