# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :fly do
  task :console do
    remote_do "app/bin/rails console"
  end

  task :db do
    remote_do "app/bin/rails db"
  end

  private

  def remote_do(command)
    sh("fly ssh console -C \"#{command}\"")
  end
end
