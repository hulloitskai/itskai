# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

begin
  require 'bundler/audit/task'
  Bundler::Audit::Task.new
rescue LoadError
end

require_relative "config/application"
Rails.application.load_tasks
