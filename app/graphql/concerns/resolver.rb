# typed: strict
# frozen_string_literal: true

module Resolver
  extend T::Sig
  extend T::Helpers
  include Routing

  # == Annotations
  abstract!
  requires_ancestor { Kernel }

  # == Methods
  sig { abstract.returns(GraphQL::Query::Context) }
  def context; end

  private

  # == Helpers
  sig { returns(ItsKai::Application) }
  def app = ItsKai.application

  sig { returns(T.nilable(ActionController::Base)) }
  def controller
    context[:controller]
  end

  sig { returns(ActionController::Base) }
  def controller!
    controller or raise "Not executing within a controller"
  end

  sig { returns(T.nilable(ActionCable::Channel)) }
  def channel
    context[:channel]
  end

  sig { returns(ActionCable::Channel) }
  def channel!
    channel or raise "Not executing within a channel"
  end

  sig { returns(ActionDispatch::Flash::FlashHash) }
  def flash
    controller&.flash || ActionDispatch::Flash::FlashHash.new
  end

  sig { returns(String) }
  def actor_id
    context[:actor_id] or raise "Missing actor ID"
  end

  sig { returns(T.nilable(T.any(User, Symbol))) }
  def current_user
    context[:current_user]
  end

  sig { returns(T.nilable(User)) }
  def active_user
    user = current_user
    user if user.is_a?(User)
  end

  sig { returns(T::Boolean) }
  def system_user?
    current_user == :system
  end

  sig { returns(User) }
  def current_user!
    active_user or raise GraphQL::ExecutionError, "Not authenticated."
  end
end
