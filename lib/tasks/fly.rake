# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :fly do
  task :console do
    fly_exec "app/bin/rails console"
  end

  task :db do
    fly_exec "app/bin/rails db"
  end

  private

  def fly_exec(command)
    exec("fly", "ssh", "console", "-C", command)
  end
end
