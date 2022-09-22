# typed: strict
# frozen_string_literal: true

require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ItsKai
  class Application < Rails::Application
    # Apply patches.
    config.before_configuration do
      require "core_ext"
      require "rails_ext"
    end

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # == Code Loading ==
    # See: https://edgeguides.rubyonrails.org/autoloading_and_reloading_constants.html#load_path
    config.add_autoload_paths_to_load_path = false

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # == Generators ==
    config.app_generators.scaffold_controller(:responders_controller)
    config.generators do |g|
      # Generate Active Record model and migration with UUID primary keys.
      g.orm(:active_record, primary_key_type: :uuid)

      # Don't generate helpers.
      g.helper(false)

      # Don't generate tests.
      g.test_framework(nil)
      g.controller_specs(false)
      g.view_specs(false)
      g.helper_specs(false)
      g.model_specs(false)
    end

    # == Sessions ==
    config.session_store(:cookie_store, key: "session")

    # == Action View ==
    config.action_view.frozen_string_literal = true

    # == Active Record ==
    # config.active_record.destroy_association_async_batch_size = 1000
    config.active_record.internal_metadata_table_name =
      "active_record_internal_metadata"
    config.active_record.schema_migrations_table_name =
      "active_record_schema_migrations"

    # == Action Cable ==
    config.action_cable.mount_path = "/rails/action_cable/cable"

    # == Active Job ==
    config.active_job.queue_adapter = :good_job

    # == Active Storage ==
    config.active_storage.variant_processor = :vips

    # == Active Support ==
    config.active_support.remove_deprecated_time_with_zone_name = true

    # == Action Mailer ==
    config.action_mailer.perform_deliveries =
      ENV.fetch("RAILS_MAILER_PERFORM_DELIVERIES", "true").truthy?

    # == Responders ==
    config.responders.redirect_status = :see_other
  end
end
