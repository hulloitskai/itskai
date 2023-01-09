# typed: false
# frozen_string_literal: true

namespace :linear do
  desc "Dump the Linear GraphQL schema into a JSON file."
  task schema: :environment do
    GraphQL::Client.dump_schema(
      Linear::Adapter,
      Rails.root.join(Linear::SCHEMA_PATH).to_s,
    )
  end
end
