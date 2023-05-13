# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :graphql do
  namespace :generate do
    desc "Generate GraphQL schema from introspection query"
    task :schema do
      codegen "schema"
    end

    desc "Generate GraphQL client code from schema"
    task :client do
      codegen "client"
    end
  end

  task :generate do
    puts "=> Generating schema"
    codegen "schema"
    puts "=> Generate client code"
    codegen "client"
  end

  private

  def codegen(target)
    command = Rails.root.join("bin/graphql-codegen").to_s
    system(command, target) || abort("Failed to run GraphQL code generator!")
  end
end
