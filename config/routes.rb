# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Redirects
  constraints subdomain: "www" do
    get "(*any)" => redirect(subdomain: "", status: 302)
  end

  # == Journey
  scope(
    constraints: JourneysSubdomainConstraint.new,
    module: "journeys",
    as: "journeys",
  ) do
    get "/" => "home#show", as: "root"
    resources :sessions, only: %i[show create] do
      post :join
    end
  end

  # == Healthcheck
  Healthcheck.routes(self)

  # == Good Job
  if Rails.env.development?
    mount GoodJob::Engine => "/good_job"
  else
    authenticate :user, ->(user) {
      user = T.let(user, User)
      user.owner?
    } do
      mount GoodJob::Engine => "/good_job"
    end
  end

  # == Devise
  devise_for :users,
             skip: %i[sessions confirmations passwords],
             controllers: {
               omniauth_callbacks: "users/omniauth_callbacks",
               registrations: "users/registrations",
             },
             path: "/user",
             path_names: {
               sign_up: "register",
               edit: "settings",
             }
  devise_scope :user do
    resource :sessions,
             path: "/",
             module: "users",
             as: :user_session,
             only: [] do
               get :login, action: :new, as: :new
               post :login, action: :create, as: ""
               post :logout, action: :destroy, as: :destroy
             end
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
    get "/", action: :graphiql, as: :graphiql
    post "/", action: :execute, as: :graphql
  end

  # == Calendly
  get "/calendly" => "calendly#show"
  get "/hangout" => "calendly#show"
  get "/coffee" => "calendly#event", handle: "coffee"
  get "/walk" => "calendly#event", handle: "walk"
  get "/call" => "calendly#event", handle: "call"
  get "/opencal-intro" => "calendly#event", handle: "opencal-intro"

  # == Events
  # resources :events, only: :index

  # == Poorly Drawn Lines
  namespace :poorlydrawnlines do
    resources :comics, only: :show
  end

  # == Dishwatch
  # namespace :dishwatch do
  #   resource :devices, only: :show
  # end

  # == Errors
  scope controller: :errors do
    match "/401", action: :unauthorized, via: :all
    match "/404", action: :not_found, via: :all
    match "/422", action: :unprocessable_entity, via: :all
    match "/500", action: :internal_server_error, via: :all
  end

  # == Locate
  resource :locate, controller: "locate", only: :show do
    get :grant
  end

  # == Resume
  resource :resume, only: :show

  # # == Scottkit
  # resource :scottkit, only: :show

  # # == Scottcall
  # post "/scottcall" => "scottcalls#handle"

  # == Timeline
  get "/timeline" => "timeline#show"
  get "/timeline/admin" => "timeline_admin#show"

  # == Pages
  root "home#show"
  get "/admin" => "admin#show"
  get "/pensieve" => "pensieve#show"
  get "/track" => redirect(path: "/locate", status: 302)
  get "/toronto" => "places#toronto"
  get "/atelier" => redirect("https://instagram.com/atelier.ubc", status: 302)
  get "/opencal" => redirect("https://opencal.me/kai", status: 302)
  get "/src" => redirect("https://github.com/hulloitskai/itskai", status: 302)
  inertia "/loading" => "LoadingPage"

  # == Development
  if Rails.env.development?
    get "/test" => "test#show"
    get "/mailcatcher" => redirect("//localhost:1080", status: 302)
  end
end
