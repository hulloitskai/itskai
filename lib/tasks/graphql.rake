# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :graphql do
  namespace :generate do
    desc "Generate GraphQL schema from introspection query"
    task :schema do
      codegen "schema"
    end

    desc "Generate app GraphQL code from schema"
    task :app do
      codegen "app"
    end

    desc "Generate extension GraphQL code from schema"
    task :extension do
      codegen "extension"
    end
  end

  task :generate do
    puts "=> Generating schema"
    codegen "schema"

    puts "\n=> Generating app code"
    codegen "app"

    puts "\n=> Generating extension code"
    codegen "extension"
  end

  private

  def codegen(target)
    command = Rails.root.join("bin/graphql-codegen").to_s
    system(command, target) || abort("Failed to run GraphQL code generator!")
  end
end
