# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :graphql do
  namespace :generate do
    desc "Generate GraphQL schema from introspection query"
    task :schema do
      codegen "schema"
    end

    desc "Generate GraphQL helpers from schema"
    task :helpers do
      codegen "helpers"
    end
  end

  task :generate do
    puts "=> Generating schema"
    codegen "schema"

    puts "\n=> Generating helpers"
    codegen "helpers"
  end

  private

  def codegen(target)
    command = Rails.root.join("bin/graphql-codegen").to_s
    system(command, target) || abort("Failed to run GraphQL code generator!")
  end
end
