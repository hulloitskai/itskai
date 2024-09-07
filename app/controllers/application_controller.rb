# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig
  extend T::Helpers

  include ActiveStorage::SetCurrent
  include RemembersUserLocation
  include Logging

  # == Filters
  before_action :set_actor_id
  before_action :authorize_rack_mini_profiler
  around_action :with_error_context
  if !InertiaRails.ssr_enabled? && Rails.env.development?
    around_action :with_ssr
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

  # == Rescuers
  rescue_from ActionPolicy::Unauthorized,
              with: :redirect_to_login_if_signed_out

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
    return if cookies.key?(:actor_id)
    cookies.permanent.signed[:actor_id] = current_user&.id || SecureRandom.uuid
  end

  sig { void }
  def authorize_rack_mini_profiler
    Rack::MiniProfiler.authorize_request if current_user&.owner?
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
      vite_dev_server_enabled = ViteRuby.dev_server_enabled?
      inertia_ssr_enabled = InertiaRails.ssr_enabled?
      begin
        ViteRuby.dev_server_enabled = false
        InertiaRails.configure { |config| config.ssr_enabled = true }
        yield
      ensure
        InertiaRails.configure do |config|
          config.ssr_enabled = inertia_ssr_enabled
        end
        ViteRuby.dev_server_enabled = vite_dev_server_enabled
      end
    else
      yield
    end
  end

  # == Rescue callbacks
  sig { params(args: T.untyped).void }
  def redirect_to_login_if_signed_out(*args)
    if signed_in?
      raise
    else
      authenticate_user!
    end
  end
end
