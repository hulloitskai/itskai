# typed: true
# frozen_string_literal: true

return unless Rails.env.development?

command_path = Rails.root.join("bin/tapioca")
unless command_path.exist?
  abort(
    "Missing `bin/tapioca' command. Please run `bundle binstubs tapioca` " \
      "to install it.",
  )
end

migration_tasks = %w[
  db:migrate
  db:migrate:up
  db:migrate:reset
  db:migrate:redo
]

if defined?(Rails::Application)
  require "active_record"
  databases = ActiveRecord::Tasks::DatabaseTasks.setup_initial_database_yaml
  ActiveRecord::Tasks::DatabaseTasks.for_each(databases) do |spec_name|
    database_tasks = %w[
      db:migrate
      db:migrate:up
    ].map do |task|
      "#{task}:#{spec_name}"
    end
    migration_tasks.concat(database_tasks)
  end
end

migration_tasks.each do |task|
  next unless Rake::Task.task_defined?(task)
  Rake::Task[task].enhance do
    Rake::Task[Rake.application.top_level_tasks.last].enhance do
      system(command_path.to_s, "dsl", exception: true)
    end
  end
end
