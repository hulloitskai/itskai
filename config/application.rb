# rubocop:disable Style/MethodCallWithArgsParentheses
# typed: strict
# frozen_string_literal: true

require_relative "boot"
require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# == Configuration
module ItsKai
  extend T::Sig

  class Application < Rails::Application
    extend T::Sig

    # == Extensions
    require "core_ext"
    require "rails_ext"
    require "oj_serializers_ext"
    require "types_from_serializers_ext"
    require "js_from_routes_ext"
    require "pg_search_ext"
    require "better_errors_ext"
    require "vite_ruby_ext"
    require "inertia_rails_ext"
    require "bullet_ext"
    require "devise_ext"
    require "premailer_ext"
    require "friendly_id_ext"
    require "email_validator_ext"

    # == Libraries
    require "inflections"
    require "custom_devise_failure_app"
    require "announcement"
    require "logging"
    require "owner"
    require "admin"
    require "fullstory"
    require "clarity"
    require "google"
    require "mapbox"
    require "spotify"
    require "icloud"
    require "badwords"
    require "contact"
    require "location"
    require "resume"

    # == Configuration
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults(8.0)

    # == Autoloading
    # Only autoload workers, interceptors once.
    Rails.autoloaders.main.ignore "app/workers", "app/interceptors"
    config.autoload_once_paths += ["app/workers", "app/interceptors"]

    # == Generators
    config.generators do |g|
      # Generate Active Record model and migration with UUID primary keys.
      g.orm :active_record, primary_key_type: :uuid

      # Don't generate helpers.
      g.helper false

      # Don't generate tests.
      g.test_framework nil
      g.controller_specs false
      g.view_specs false
      g.helper_specs false
      g.model_specs false

      # Don't generate views or assets.
      g.template_engine nil
      g.assets false
    end

    # == Routing
    config.exceptions_app = routes

    # == Active Record
    config.active_record.destroy_association_async_batch_size = 1000
    config.active_record.internal_metadata_table_name =
      "active_record_internal_metadata"
    config.active_record.schema_migrations_table_name =
      "active_record_schema_migrations"
    config.active_record.index_nested_attribute_errors = true

    # == Action Cable
    config.action_cable.mount_path = "/cable"

    # == Active Job
    config.active_job.queue_adapter = :good_job

    # == Active Storage
    config.active_storage.variant_processor = :vips
    config.active_storage.routes_prefix = "/storage"
    config.active_storage.direct_uploads_size_limit = 25.megabytes

    # == Credentials
    sig { returns(T::Boolean) }
    def credentials_available?
      ENV.exclude?("SECRET_KEY_BASE_DUMMY")
    end

    # == Boot time
    BOOTED_AT = T.let(Time.current, Time)

    sig { returns(Time) }
    def booted_at = BOOTED_AT
  end
end
