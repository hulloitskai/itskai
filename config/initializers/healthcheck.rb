# typed: strict
# frozen_string_literal: true

Healthcheck.configure do |config|
  config.success = 200
  config.error = 503
  config.verbose = true
  config.route = "/status"
  config.method = :get

  # == Checks
  config.add_check(
    :database,
    -> do
      Rails.logger.silence { ActiveRecord::Base.connection.execute("select 1") }
    end,
  )
  config.add_check(
    :migrations,
    -> { Rails.logger.silence { ActiveRecord::Migration.check_pending! } },
  )
  config.add_check(:cache, -> { Rails.cache.read("some_key") })

  # config.add_check(
  #   :environments,
  #   -> { Dotenv.require_keys("ENV_NAME", "ANOTHER_ENV") },
  # )

  # == Custom Response
  # config.custom =
  #   lambda do |controller, checker|
  #     unless checker.errored?
  #       return controller.render(plain: "Everything is awesome!")
  #     end
  #     if controller.verbose?
  #       controller.verbose_error(checker)
  #     else
  #       controller.head_error
  #     end
  #   end
end
