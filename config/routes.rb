# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Healthcheck
  Healthcheck.routes(self)

  # == Devise
  devise_for :users,
             path: :account,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations",
               omniauth_callbacks: "users/omniauth_callbacks",
             }

  # == API
  scope :api do
    mount GraphiQL::Rails::Engine,
          at: :/,
          as: :graphiql,
          graphql_path: "/api/graphql"
    scope :graphql, controller: :graphql do
      get :/, to: redirect("/api")
      post :/, action: :execute, as: :graphql
    end
  end

  # == Pages
  root "home#show"
  get :calendly, to: "calendly#show"
  get :hangout, to: "calendly#show"
  get :test, to: "test#show"
  get :work, to: "work#show"
  get :resume, to: "resume#show"
  get :jen, to: "jen#show"

  # == Internal
  authenticate :user, ->(user) { user.owner? } do
    mount GoodJob::Engine, at: "/good_job"
  end
end
