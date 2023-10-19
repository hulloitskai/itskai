# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig
  extend T::Helpers

  include ActiveStorage::SetCurrent
  include Queryable
  include RemembersUserLocation

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

  sig { override.returns(T.nilable(User)) }
  def current_user
    T.cast(super, T.nilable(User))
  end

  sig { returns(User) }
  def current_user!
    authenticate_user!
  end

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
end
