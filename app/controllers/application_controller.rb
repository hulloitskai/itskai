# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig

  # == Filters
  around_action :set_error_context_around

  # == Modules
  include GraphQL::Querying

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
  sig { returns(T::Hash[Symbol, T.untyped]) }
  def error_context
    context = current_user.try! do |user|
      user = T.let(user, User)
      {
        user_id: user.id,
        user_email: user.email,
      }
    end
    context || {}
  end

  # == Filters
  # sig { void }
  # def debug_action
  #   targets = params[:debug]
  #   if targets.is_a?(String) && targets.split(",").include?("action")
  #     target = "#{self.class.name}##{action_name}"
  #     binding.break(do: "break #{target} pre: delete 0")
  #   end
  # end

  sig { params(block: T.proc.returns(T.untyped)).void }
  def set_error_context_around(&block)
    context = error_context.compact
    Rails.error.set_context(**context)
    yield
  end
end

# == Devise ==
class ApplicationController
  extend T::Sig

  # == Filters ==
  before_action :store_user_location!, if: :storable_location?

  private

  # == Helpers ==
  sig { returns(T::Boolean) }
  def storable_location?
    request.get? && is_navigational_format? &&
      (!request.xhr? || request.inertia?) && !devise_controller?
  end

  sig { void }
  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end
