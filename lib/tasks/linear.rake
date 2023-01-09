# rubocop:disable Rails/RakeEnvironment
# typed: false
# frozen_string_literal: true

namespace :linear do
  namespace :schema do
    task :dump do
      GraphQL::Client.dump_schema(
        Linear::Adapter,
        "config/linear/schema.generated.json",
      )
    end
  end
end
