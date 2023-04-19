# typed: true
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Redirects
  constraints subdomain: "www" do
    get "(*any)" => redirect(subdomain: "", status: 302)
  end

  # == Healthcheck
  Healthcheck.routes(self)

  # == Devise
  devise_for :users,
             skip: %i[confirmations passwords],
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations",
               confirmations: "users/confirmations",
               passwords: "users/passwords",
             },
             path: "user",
             path_names: {
               sign_in: "login",
               sign_out: "logout",
               sign_up: "register",
               edit: "settings",
               confirmation: "verification",
             }
  devise_scope :user do
    get :login, to: "users/sessions#new"
    scope :user, module: "users", as: :user do
      resource :confirmation,
               only: %i[new show],
               path: "/verification",
               path_names: {
                 new: "resend",
               }
      resource :password,
               only: %i[new edit update],
               path_names: {
                 new: "reset",
                 edit: "change",
               }
    end
  end

  # == GraphQL
  scope :graphql, controller: :graphql do
    mount GraphiQL::Rails::Engine,
          at: :/,
          as: :graphiql,
          graphql_path: "/graphql"
    post :/, action: :execute, as: :graphql
  end

  # == Obsidian
  resources :obsidian_notes, path: "entries", only: :show

  # == Linear
  resources :linear_issues, path: "issues", only: :create

  # == Calendly
  get "/calendly" => "calendly#show"
  get "/hangout" => "calendly#show"

  # == Notify
  post "/notify" => "notify#create"

  # == Errors
  scope controller: :errors do
    match "/404", action: :not_found, via: :all
    match "/500", action: :internal_server_error, via: :all
    match "/401", action: :unauthorized, via: :all
  end

  # == Pages
  root "home#show"
  inertia "/work" => "WorkPage"
  get "/test" => "test#show"
  get "/resume" => "resume#show"
  get "/jen" => redirect("/entries/birthday-writings-for-jen", status: 302)

  # == Development
  if Rails.env.development?
    mount GoodJob::Engine => "/good_job"
    get "/mailcatcher" => redirect("//localhost:1080", status: 302)
  end

  # == Administration
  unless Rails.env.development?
    authenticate :user, ->(user) { user.owner? } do
      mount GoodJob::Engine => "/good_job"
    end
  end
end
