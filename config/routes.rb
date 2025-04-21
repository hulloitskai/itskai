# typed: true
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
  mount GoodJob::Engine => "/good_job"

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
        path: "/account",
        only: %i[edit update],
        path_names: { edit: "" },
      ) do
        post :change_email
        post :change_password
      end
      scope path: "/account" do
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
  end

  # == Attachments
  resources :files, only: :show, param: :signed_id, export: true
  resources :images, only: :show, param: :signed_id, export: true

  # == Password strength checks
  resources :password_strength_checks, only: :create, export: true

  # == Contact
  resource :contact_url, only: :show, export: true

  # == Push subscriptions
  resources :push_subscriptions, only: :create, export: true do
    collection do
      get :public_key
      post :lookup
      post :change
      post :unsubscribe
      post :test
    end
  end

  # == Notifications
  resources :notifications, only: [], export: true do
    member do
      post :delivered
    end
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

  # == Notion journal entry comments
  resources :notion_journal_entry_comments,
            path: "notion_journal_entries/:entry_id/comments",
            only: %i[index create],
            export: true

  # == Exploration comments
  resources :exploration_comments,
            path: "exploration/:exploration_id/comments",
            only: :create,
            export: true

  # == Admin
  resource :admin, controller: "admin", only: :show, export: true
  namespace :admin, export: true do
    resource :settings, only: :show
    resources :notifications, only: :index
    resources :oauth_connections,
              only: :destroy,
              param: :provider
    resource :icloud_connection, only: %i[create destroy] do
      post :verify_security_code
    end
    resources :location_access_grants, only: %i[index create destroy]
    resources :exploration_comments, only: :index
    resources :friends, only: %i[index create]
    resources :statuses, only: %i[index create destroy] do
      member do
        post :notify_friends
      end
    end
    resources :notion_journal_entries, only: [] do
      collection do
        post :sync
      end
    end
    resources :location_logs, only: [] do
      collection do
        post :sync
        post :backfill_addresses
      end
    end
  end

  # == Resume
  resource :resume, only: :show, export: true

  # == Cathendant
  namespace :cathendant, export: true do
    get "/" => "home#show"
    get "/contribute" => "home#contribute"
    resources :memos, only: :create
  end

  # == Adders
  resources :add_event_emails, path: "/add/event_emails", only: :create

  # == Friends
  resource :friend, only: :show, export: true do
    get "manifest.webmanifest" => :manifest, constraints: { format: "" }
    post :vibecheck
  end

  # == Scottickers
  resources :scottickers, only: %i[index create], export: true

  # == Calendly
  get "/calendly" => "calendly#show"
  get "/hangout" => "calendly#show", export: true
  get "/coffee" => "calendly#event", handle: "coffee"
  get "/walk" => "calendly#event", handle: "walk"
  get "/call" => "calendly#event", handle: "call"

  # == Pages
  defaults export: true do
    root "home#show"
    scope format: true, constraints: { format: "atom" } do
      get "/feed" => "home#feed", as: :feed
    end
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
