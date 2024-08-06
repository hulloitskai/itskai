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
    mount GoodJob::Engine => "/good_job", export: true
  else
    authenticate :user, ->(user) {
      user = T.let(user, User)
      user.admin?
    } do
      mount GoodJob::Engine => "/good_job"
    end
  end

  # == Devise
  devise_for :users,
             skip: %i[registration confirmation password],
             controllers: {
               sessions: "users/sessions",
               #  omniauth_callbacks: "users/omniauth_callbacks",
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
      resource :registration,
               path: "/settings",
               only: %i[edit update],
               path_names: { edit: "" }
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

  # == Attachments
  resources :files, only: :show, param: :signed_id, export: true
  resources :images, only: :show, param: :signed_id, export: true

  # == Password strength checks
  resources :password_strength_checks, only: :create, export: true

  # == Contact
  resource :contact_url, only: :show, export: true

  # == Pages
  defaults export: true do
    root "home#show"
  end
  get "/src" => redirect(
    "https://github.com/hulloitskai/storyloop",
    status: 302,
  )

  # == Development
  if Rails.env.development?
    resource :test, controller: "test", only: :show, export: true do
      post :submit
    end
    get "/mailcatcher" => redirect("//localhost:1080", status: 302)
  end
end
