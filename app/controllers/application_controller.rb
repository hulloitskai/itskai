# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig
  extend T::Helpers
  include ActiveStorage::SetCurrent
  include GraphQL::Querying

  # == Devise: Filters
  before_action :store_user_location!, if: :storable_location?

  # == Filters
  before_action :set_actor_id
  around_action :with_error_context

  # == Inertia
  inertia_share do
    {
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token,
      },
      flash: flash.to_h.presence,
    }.compact
  end

  private

  # == Helpers
  sig { returns(ItsKai::Application) }
  def app = ItsKai.application

  sig { returns(T::Hash[Symbol, T.untyped]) }
  def error_context
    case current_user
    in { id:, email: }
      { user_id: id, user_email: email }
    else
      {}
    end
  end

  # == Filter Handlers
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

  sig { params(block: T.proc.returns(T.untyped)).void }
  def with_error_context(&block)
    context = T.let(error_context.compact, T::Hash[String, T.untyped])
    Rails.error.set_context(**context)
    yield
  end

  # == Devise: Helpers
  sig { override.returns(T.nilable(User)) }
  def current_user = super

  sig { returns(User) }
  def current_user!
    authenticate_user!
  end

  sig { returns(T::Boolean) }
  def storable_location?
    request.get? && is_navigational_format? &&
      (!request.xhr? || request.inertia?) && !devise_controller?
  end

  # == Devise: Filter handlers
  sig { void }
  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end
