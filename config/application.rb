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
    require "actionview_ext"
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
    require "notifications"
    require "logging"
    require "owner"
    require "admin"
    require "google"
    require "spotify"
    require "icloud"
    require "pensieve"
    require "telnyx"
    require "badwords"
    require "contact"
    require "location"
    require "resume"

    # == Constants
    BOOTED_AT = T.let(Time.current, Time)

    # == Defaults
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults(7.1)

    # == Code loading
    # Only autoload workers, interceptors once.
    Rails.autoloaders.main.ignore "app/workers", "app/interceptors"
    config.autoload_once_paths += ["app/workers", "app/interceptors"]

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

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

    # == Logging
    if ENV["RAILS_LOG_TO_STDOUT"].truthy?
      config.logger = scoped do
        logger = ActiveSupport::Logger.new($stdout)
        logger.formatter = config.log_formatter
        ActiveSupport::TaggedLogging.new(logger)
      end
    end

    # == Sessions
    config.session_store :cookie_store, key: "session"

    # == Exceptions
    config.exceptions_app = routes
    config.action_dispatch
      .rescue_responses["ActionPolicy::Unauthorized"] = :unauthorized

    # == Action View
    config.action_view.frozen_string_literal = true

    # == Active Record
    # config.active_record.destroy_association_async_batch_size = 1000
    config.active_record.internal_metadata_table_name =
      "active_record_internal_metadata"
    config.active_record.schema_migrations_table_name =
      "active_record_schema_migrations"
    config.active_record.index_nested_attribute_errors = true
    config.active_record.encryption.primary_key =
      ENV["RAILS_ENCRYPTION_PRIMARY_KEY"]
    config.active_record.encryption.deterministic_key =
      ENV["RAILS_ENCRYPTION_DETERMINISTIC_KEY"]
    config.active_record.encryption.key_derivation_salt =
      ENV["RAILS_ENCRYPTION_KEY_DERIVATION_SALT"]

    # == Action Cable
    # config.action_cable.mount_path = "/cable"

    # == Active Job
    config.active_job.queue_adapter = :good_job

    # == Active Storage
    config.active_storage.variant_processor = :vips
    config.active_storage.routes_prefix = "/storage"
    config.active_storage.direct_uploads_size_limit = 25.megabytes

    # == Active Support
    config.active_support.remove_deprecated_time_with_zone_name = true

    # == Server info
    sig { returns(Time) }
    def booted_at = BOOTED_AT
  end

  # == Methods
  sig { returns(ItsKai::Application) }
  def self.application = T.cast(Rails.application, ItsKai::Application)
end
