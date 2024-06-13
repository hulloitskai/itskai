# typed: strict
# frozen_string_literal: true

Healthcheck.configure do |config|
  config.success = 200
  config.error = 503
  config.verbose = true
  config.route = "/status"
  config.method = :get

  # == Checks
  config.add_check(:database, -> do
    Rails.logger.silence do
      ActiveRecord::Base.connection.execute("select 1")
    end
  end)
  config.add_check(:migrations, -> do
    Rails.logger.silence do
      ActiveRecord::Migration.check_pending!
    end
  end)
  config.add_check(:cache, -> { Rails.cache.read("some_key") })

  # config.add_check(
  #   :environments,
  #   -> { Dotenv.require_keys("ENV_NAME", "ANOTHER_ENV") },
  # )

  # == Custom Response
  config.custom = ->(controller, checker) {
    controller.render(json: StatusSerializer.render(checker))
  }
end
