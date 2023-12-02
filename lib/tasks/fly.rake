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

  private

  def fly_exec(command, pty: false)
    args = [
      "ssh",
      "console",
      pty ? "--pty" : nil,
      "--user",
      "linuxbrew",
      "--command",
      "bash --login -c \"#{command}\"",
    ].compact
    exec("fly", *args)
  end
end
