# typed: strict
# frozen_string_literal: true

require_relative "boot"

require "./lib/core_ext"
require "rails/all"
require "./lib/rails_ext"
require "./lib/actionview_ext"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ItsKai
  extend T::Sig

  class Application < Rails::Application
    extend T::Sig

    # == Defaults
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults(7.0)

    # == Extensions
    config.before_configuration do
      require "./lib/action_policy_ext"
      require "./lib/better_errors_ext"
      require "./lib/bullet_ext"
      require "./lib/graphql_ext"
      require "./lib/vite_ext"
      require "./lib/inertia_rails_ext"
      require "./lib/premailer_ext"
      require "./lib/email_validator_ext"
      require "./lib/devise_ext"
      require "./lib/friendly_id_ext"
      require "./lib/discordrb_ext"
    end

    # == Code Loading
    # See: https://edgeguides.rubyonrails.org/autoloading_and_reloading_constants.html#load_path
    config.add_autoload_paths_to_load_path = false

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
      g.orm(:active_record, primary_key_type: :uuid)

      # Don't generate helpers.
      g.helper(false)

      # Don't generate tests.
      g.test_framework(nil)
      g.controller_specs(false)
      g.view_specs(false)
      g.helper_specs(false)
      g.model_specs(false)

      # Don't generate views or assets.
      g.template_engine(nil)
      g.assets(false)
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
    config.session_store(:cookie_store, key: "session")

    # == Exceptions
    config.exceptions_app = T.unsafe(self).routes
    config.action_dispatch.rescue_responses.merge!( # rubocop:disable Performance/RedundantMerge
      "ActionPolicy::Unauthorized" => :unauthorized,
    )

    # == Action View
    config.action_view.frozen_string_literal = true

    # == Active Record
    # config.active_record.destroy_association_async_batch_size = 1000
    config.active_record.internal_metadata_table_name =
      "active_record_internal_metadata"
    config.active_record.schema_migrations_table_name =
      "active_record_schema_migrations"
    config.active_record.index_nested_attribute_errors = true

    # == Action Cable
    config.action_cable.mount_path = "/rails/action_cable/cable"

    # == Active Job
    config.active_job.queue_adapter = :good_job

    # == Active Storage
    config.active_storage.variant_processor = :vips

    # == Active Support
    config.active_support.remove_deprecated_time_with_zone_name = true

    # == Booted At
    BOOTED_AT = T.let(Time.current, Time)

    sig { returns(Time) }
    def booted_at = BOOTED_AT
  end

  # == Methods
  sig { returns(ItsKai::Application) }
  def self.application = T.cast(Rails.application, ItsKai::Application)
end
