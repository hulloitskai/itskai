# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig

  # == Filters
  around_action :prepare_action

  # == Modules
  include GraphQL::Querying

  # == Inertia
  inertia_share do
    T.bind(self, ApplicationController)
    flash = self.flash.to_h.presence
    {
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token,
      },
      flash:,
    }.compact
  end

  private

  # == Filters
  sig { void }
  def set_honeybadger_context
    current_user.try! do |user|
      user = T.let(user, User)
      Honeybadger.context(user_id: user.id, user_email: user.email)
    end
  end

  # sig { void }
  # def debug_action
  #   targets = params[:debug]
  #   if targets.is_a?(String) && targets.split(",").include?("action")
  #     target = "#{self.class.name}##{action_name}"
  #     binding.break(do: "break #{target} pre: delete 0")
  #   end
  # end

  sig { params(block: T.proc.returns(T.untyped)).void }
  def prepare_action(&block)
    set_honeybadger_context
    yield
  end
end
