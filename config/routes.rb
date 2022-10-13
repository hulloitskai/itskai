# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Healthcheck ==
  Healthcheck.routes(self)

  # == API ==
  scope :api do
    mount GraphiQL::Rails::Engine, at: :/, graphql_path: "/api/graphql"
    scope :graphql, controller: :graphql do
      post :/, action: :execute, as: :graphql
    end
  end

  # == Good Job ==
  mount GoodJob::Engine, at: "/good_job" if Rails.env.development?

  # == Pages ==
  root "home#show"
  get :test, to: "test#show"
  get :work, to: "work#show"
  get :resume, to: "resume#show"

  # authenticate :user, lambda(&:admin?) do
  #   mount GoodJob::Engine, at: "/good_job"
  # end
  # scope controller: "high_voltage/pages", action: "show", id: "401" do
  #   get "/good_job"
  # end

  # Defines the root path route ("/")
  # root "articles#index"
end
