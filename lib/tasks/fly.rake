# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :fly do
  task :console do
    fly_exec "bin/rails console", pty: true
  end

  task :db do
    fly_exec "bin/rails db"
  end

  task :restart do
    fly_exec "bin/rails restart"
  end

  private

  def fly_exec(command, pty: false)
    args = [
      "ssh",
      "console",
      pty ? "--pty" : nil,
      "--command",
      command,
    ].compact
    exec("fly", *args)
  end
end
