# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :graphql do
  task :generate do
    path = Rails.root.join("bin/graphql-codegen")
    system(path.to_s) || abort("Failed to run GraphQL code generator!")
  end
end
