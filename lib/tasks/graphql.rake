# typed: false
# frozen_string_literal: true
# rubocop:disable Rails/RakeEnvironment

namespace :graphql do
  task :generate do
    path = Rails.root.join("bin/graphql-codegen")
    system(path.to_s) || abort("Failed to run GraphQL code generator!")
  end
end

# rubocop:enable Rails/RakeEnvironment
