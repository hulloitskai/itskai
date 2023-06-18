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

  sig { returns(T.nilable(GraphQLController)) }
  def controller
    context[:controller]
  end

  sig { returns(GraphQLController) }
  def controller!
    controller = self.controller
    raise "not executing within a controller" if controller.nil?
    controller
  end

  sig { returns(T.nilable(GraphQLChannel)) }
  def channel
    context[:channel]
  end

  sig { returns(GraphQLChannel) }
  def channel!
    channel = self.channel
    raise "not executing within a channel" if channel.nil?
    channel
  end

  sig { returns(ActionDispatch::Flash::FlashHash) }
  def flash
    controller = self.controller
    if controller
      controller.flash
    else
      ActionDispatch::Flash::FlashHash.new
    end
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
