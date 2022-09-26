# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Healthcheck ==
  Healthcheck.routes(self)

  # Defines the root path route ("/")
  # root "articles#index"

  root "hello_world#index"
end
