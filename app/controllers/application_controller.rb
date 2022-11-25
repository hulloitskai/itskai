# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig

  # == Exceptions ==
  # rescue_from ActionPolicy::Unauthorized, with: :show_unauthorized

  # == Filters ==
  before_action :debug_action
  around_action :prepare_action

  # == Modules ==
  include GraphQL::Querying

  # == Inertia ==
  inertia_share do
    T.bind(self, ApplicationController)
    flash = self.flash.to_h.presence
    {
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token,
      },
      flash: flash,
    }.compact
  end

  private

  # == Exceptions ==
  # sig { params(exception: Exception).void }
  # def show_unauthorized(exception)
  #   raise exception if request.local?
  #   render("pages/401", status: :unauthorized)
  # end

  # == Filters ==
  sig { void }
  def set_honeybadger_context
    current_user.try! do |user|
      user = T.let(user, User)
      Honeybadger.context(user_id: user.id, user_email: user.email)
    end
  end

  sig { void }
  def debug_action
    targets = params[:debug]
    if targets.is_a?(String) && targets.split(",").include?("action")
      target = "#{self.class.name}##{action_name}"
      binding.break(do: "break #{target} pre: delete 0") # rubocop:disable Lint/Debugger
    end
  end

  sig { params(block: T.proc.returns(T.untyped)).void }
  def prepare_action(&block)
    set_honeybadger_context
    yield
  end
end
