# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig
  extend T::Helpers

  include ActiveStorage::SetCurrent
  include Pagy::Backend
  include RemembersUserLocation
  include Logging
  include RendersJsonException
  include AuthenticatesFriends

  # == Filters
  before_action :set_actor_id
  around_action :with_error_context
  if !InertiaRails.configuration.ssr_enabled && Rails.env.development?
    around_action :with_ssr
  end

  # == Devise
  # Make authenticate_user! compatible with Pretender and fetch requests.
  sig { override.params(opts: T.untyped).returns(User) }
  def authenticate_user!(opts = {})
    if (user = current_user)
      user
    elsif request.format.html?
      super
    else
      raise UnauthenticatedError
    end
  end

  # == Inertia
  inertia_share do
    {
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token,
      },
      flash: flash.to_h,
      "currentUser" => UserSerializer.one_if(current_user),
    }
  end

  # == Pagy
  sig do
    params(pagy: Pagy, absolute: T::Boolean)
      .returns(T::Hash[Symbol, T.untyped])
  end
  def pagy_metadata(pagy, absolute: false)
    metadata = super
    metadata.delete(:limit) if params.exclude?(pagy.vars[:limit_param])
    metadata
  end

  # == Exception handlers
  rescue_from RuntimeError,
              ActiveRecord::RecordNotSaved,
              with: :report_and_render_json_exception
  rescue_from ActionPolicy::Unauthorized, with: :handle_unauthorized
  rescue_from ActionController::InvalidAuthenticityToken,
              with: :handle_invalid_authenticity_token

  private

  # == Helpers
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def error_context
    case current_user
    in { id:, email: }
      { user_id: id, user_email: email }
    else
      {}
    end
  end

  sig { returns(String) }
  def actor_id
    cookies.signed[:actor_id] or raise "Missing actor ID"
  end

  # == Filter handlers
  # sig { void }
  # def debug_action
  #   targets = params[:debug]
  #   if targets.is_a?(String) && targets.split(",").include?("action")
  #     target = "#{self.class.name}##{action_name}"
  #     binding.break(do: "break #{target} pre: delete 0")
  #   end
  # end

  sig { void }
  def set_actor_id
    unless cookies.key?(:actor_id)
      cookies.permanent.signed[:actor_id] =
        current_user&.id || SecureRandom.uuid
    end
  end

  sig { params(block: T.proc.returns(T.untyped)).void }
  def with_error_context(&block)
    context = error_context.compact
    Rails.error.set_context(**context)
    yield
  end

  sig { params(block: T.proc.returns(T.untyped)).void }
  def with_ssr(&block)
    if params["ssr"].truthy?
      vite_dev_server_disabled = ViteRuby.dev_server_disabled?
      inertia_ssr_enabled = InertiaRails.configuration.ssr_enabled
      begin
        ViteRuby.dev_server_disabled = true
        InertiaRails.configuration.ssr_enabled = true
        yield
      ensure
        InertiaRails.configuration.ssr_enabled = inertia_ssr_enabled
        ViteRuby.dev_server_disabled = vite_dev_server_disabled
      end
    else
      yield
    end
  end

  sig { params(error: UnauthenticatedError).void }
  def render_unauthenticated_error(error)
    render(json: { error: error.message }, status: :unauthorized)
  end

  sig { params(exception: Exception).void }
  def report_and_render_json_exception(exception)
    report_exception(exception)
    render_json_exception(exception)
  end

  sig { params(exception: Exception).void }
  def report_exception(exception)
    Rails.error.report(exception)
    Sentry.capture_exception(exception)
  end

  sig { returns(T.any(Friend, User)) }
  def authenticate_friend_or_user!
    if params.include?(:friend_token)
      authenticate_friend!
    else
      authenticate_user!
    end
  end

  # == Rescue callbacks
  sig { params(error: ActionPolicy::Unauthorized).void }
  def handle_unauthorized(error)
    if signed_in?
      if request.format.json?
        report_and_render_json_exception(error)
      else
        raise
      end
    else
      authenticate_user!
    end
  end

  sig { params(exception: ActionController::InvalidAuthenticityToken).void }
  def handle_invalid_authenticity_token(exception)
    if request.inertia?
      redirect_back_or_to("/", notice: "The page expired, please try again.")
    elsif request.format.json?
      report_and_render_json_exception(exception)
    else
      raise
    end
  end
end
