# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :graphql do
  namespace :generate do
    task :schema do
      codegen "schema"
    end
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
end

def codegen(target)
  command = Rails.root.join("bin/graphql-codegen").to_s
  system(command, target) || abort("Failed to run GraphQL code generator!")
end
