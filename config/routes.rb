# typed: strict
# frozen_string_literal: true

# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  # == Redirects
  constraints subdomain: "www" do
    get "(*any)" => redirect(subdomain: "", status: 302)
  end

  # == Errors
  scope controller: :errors do
    match "/401", action: :unauthorized, via: :all
    match "/404", action: :not_found, via: :all
    match "/422", action: :unprocessable_entity, via: :all
    match "/500", action: :internal_server_error, via: :all
  end

  # == Healthcheck
  defaults export: true do
    Healthcheck.routes(self)
  end

  # == Good Job
  if Rails.env.development?
    mount GoodJob::Engine => "/good_job"
  else
    authenticate :user, ->(user) { user.owner? } do
      mount GoodJob::Engine => "/good_job"
    end
  end

  # == Devise
  devise_for :users,
             skip: %i[registration confirmation password],
             controllers: {
               sessions: "users/sessions",
               omniauth_callbacks: "users/omniauth_callbacks",
             },
             path: "/",
             path_names: {
               sign_in: "login",
               sign_out: "logout",
             }
  devise_scope :user do
    scope module: :users, as: :user, export: true do
      resource :registration,
               path: "/signup",
               only: %i[new create destroy],
               path_names: { new: "" }
      resource(
        :registration,
        path: "/settings",
        only: %i[edit update],
        path_names: { edit: "" },
      ) do
        put :email, action: :change_email, as: :change_email
        put :password, action: :change_password, as: :change_password
      end
      resource :confirmation,
               path: "/email_verification",
               only: %i[new show create],
               path_names: {
                 new: "resend",
               }
      resource :password,
               only: %i[new edit create update],
               path_names: {
                 new: "reset",
                 edit: "change",
               }
    end
  end

  # == Calendly
  get "/calendly" => "calendly#show"
  get "/hangout" => "calendly#show"
  get "/coffee" => "calendly#event", handle: "coffee"
  get "/walk" => "calendly#event", handle: "walk"
  get "/call" => "calendly#event", handle: "call"
  get "/opencal-intro" => "calendly#event", handle: "opencal-intro"

  # == Attachments
  resources :files, only: :show, param: :signed_id, export: true
  resources :images, only: :show, param: :signed_id, export: true

  # == Password strength checks
  resources :password_strength_checks, only: :create, export: true

  # == Explorations
  resources :explorations, only: nil, export: true do
    post :comment
  end

  # == Currently playing
  resource :currently_playing, only: :show, export: true
  resource :spotify_jam_sessions,
           path: "/spotify/jam_sessions",
           only: [],
           export: true do
             post :join
           end
  resources :spotify_tracks, path: "/spotify/tracks", only: [], export: true do
    get :lyrics
  end

  # == Locate
  resource :location, path: "/locate", only: :show, export: true do
    get :grant
    post :access
  end

  # == Contact
  resource :contact_url, only: :show, export: true

  # == Notion journal entries
  resources :notion_journal_entries, only: [], export: true do
    member do
      get :comments
    end
  end

  # == Admin
  resource :admin, controller: "admin", export: true, only: :show do
    get :location_access_grants
    post :sync_notion_journal_entries
    post :sync_location_logs
    post :backfill_location_log_addresses
    scope module: "admin" do
      resources :oauth_connections,
                only: :destroy,
                param: :provider
      resource :icloud_connection, only: %i[create destroy] do
        post :verify_security_code
      end
      resources :location_access_grants, only: %i[create destroy]
    end
  end

  # == Resume
  resource :resume, only: :show

  # == Cathendant
  namespace :cathendant, export: true do
    get "/" => "home#show"
    get "/contribute" => "home#contribute"
    resources :memos, only: :create
  end

  # == Constellations
  namespace :constellations, export: true do
    get "/" => "home#show"
    resources :posts, only: :create
  end

  # == Timeline
  # get "/timeline" => "timeline#show"
  # get "/timeline/admin" => "timeline_admin#show"

  # == Pages
  defaults export: true do
    root "home#show"
    scope format: true, constraints: { format: "atom" } do
      get "/feed" => "home#feed", as: :feed
    end
    # get "/pensieve" => "pensieve#show"
  end
  get "/track" => redirect(path: "/locate", status: 302)
  get "/toronto" => "places#toronto"
  get "/atelier" => redirect("https://instagram.com/atelier.ubc", status: 302)
  get "/opencal" => redirect("https://opencal.me/kai", status: 302)
  get "/src" => redirect("https://github.com/hulloitskai/itskai", status: 302)

  # == Development
  if Rails.env.development?
    resource :test, controller: "test", only: :show, export: true do
      post :submit
    end
    get "/mailcatcher" => redirect("//localhost:1080", status: 302)
  end
end
