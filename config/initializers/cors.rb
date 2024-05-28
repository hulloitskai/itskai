# typed: strict
# frozen_string_literal: true

Rails.application.config.middleware.insert_before(0, Rack::Cors) do
  T.bind(self, Rack::Cors)

  allow do
    origins "*"
    resource "/graphql", methods: %i[post]
  end
end
