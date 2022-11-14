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

  # sig { returns(T.nilable(GraphQLController)) }
  # def controller
  #   context[:controller]
  # end

  # sig { returns(GraphQLController) }
  # def controller!
  #   controller = self.controller
  #   raise "not executing within a controller" if controller.nil?
  #   controller
  # end

  # sig { returns(T.nilable(GraphQLChannel)) }
  # def channel
  #   context[:channel]
  # end

  # sig { returns(GraphQLChannel) }
  # def channel!
  #   channel = self.channel
  #   raise "not executing within a channel" if channel.nil?
  #   channel
  # end

  sig { returns(T.nilable(User)) }
  def current_user
    context[:current_user]
  end

  sig { returns(User) }
  def current_user!
    T.must(current_user)
  end
end
