# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Healthcheck
  Healthcheck.routes(self)

  # == Devise
  devise_for :users,
             except: ["passwords"],
            controllers: {
              sessions: "users/sessions",
              registrations: "users/registrations",
              omniauth_callbacks: "users/omniauth_callbacks",
            },
            path: :user,
            path_names: {
              sign_in: :login,
              sign_out: :logout,
              sign_up: :register,
              edit: :settings,
            }

  # == GraphQL
  scope :graphql, controller: :graphql do
    mount GraphiQL::Rails::Engine,
          at: :/,
          as: :graphiql,
          graphql_path: "/graphql"
    post :/, action: :execute, as: :graphql
  end

  # == Obsidian
  resources :obsidian_notes, path: :entries, only: :show

  # == Linear
  resources :linear_issues, path: :issues, only: :create

  # == Calendly
  get :calendly, to: "calendly#show"
  get :hangout, to: "calendly#show"

  # == Errors
  scope controller: :errors do
    match "/404", action: :not_found, via: :all
    match "/500", action: :internal_server_error, via: :all
    match "/401", action: :unauthorized, via: :all
  end

  # == Pages
  root "home#show"
  get :test, to: "test#show"
  # get :work, to: "work#show"
  get :resume, to: "resume#show"
  get :jen, to: redirect("/entries/birthday-writings-for-jen", status: 302)

  # == Development
  if Rails.env.development?
    mount GoodJob::Engine, at: "/good_job"
    get "/mailcatcher", to: redirect("//localhost:1080", status: 302)
  end

  # == Administration
  unless Rails.env.development?
    authenticate :user, ->(user) { user.owner? } do
      mount GoodJob::Engine, at: "/good_job"
    end
  end
end
