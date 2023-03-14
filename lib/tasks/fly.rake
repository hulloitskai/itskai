# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :fly do
  task :console do
    fly_system "app/bin/rails console"
  end

  task :db do
    fly_system "app/bin/rails db"
  end

  private

  def fly_system(command)
    system("fly ssh console -C \"#{command}\"")
  end
end
