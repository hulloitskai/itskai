# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :fly do
  task :console do
    remote_sh "app/bin/rails console"
  end

  task :db do
    remote_sh "app/bin/rails db"
  end

  private

  def remote_sh(command)
    sh("fly ssh console -C \"#{command}\"")
  end
end
