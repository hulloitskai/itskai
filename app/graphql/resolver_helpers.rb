# typed: strict
# frozen_string_literal: true

module ResolverHelpers
  extend T::Sig
  extend T::Helpers

  include Kernel

  abstract!

  sig { abstract.returns(GraphQL::Query::Context) }
  def context; end

  sig { returns(ItsKai::Application) }
  def app
    T.cast(Rails.application, ItsKai::Application)
  end

  sig { returns(T.nilable(GraphqlController)) }
  def controller
    context[:controller]
  end

  sig { returns(GraphqlController) }
  def controller!
    controller = self.controller
    raise "Not executing within a controller" if controller.nil?
    controller
  end

  sig { returns(T.nilable(GraphqlChannel)) }
  def channel
    context[:channel]
  end

  sig { returns(GraphqlChannel) }
  def channel!
    channel = self.channel
    raise "Not executing within a channel" if channel.nil?
    channel
  end

  # sig { returns(T.nilable(User)) }
  # def current_user
  #   context[:current_user]
  # end

  sig { returns(T.nilable(String)) }
  def csrf_token
    context[:csrf_token]
  end
end
