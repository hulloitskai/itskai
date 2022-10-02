# typed: strict
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig

  # == Responder ==
  self.responder = ApplicationResponder
  respond_to :html, :json

  # == Exceptions ==
  # rescue_from ActionPolicy::Unauthorized, with: :show_unauthorized

  # == Filters ==
  before_action :verify_requested_format!
  before_action :debug_action
  around_action :prepare_action

  # == Rendering ==
  sig { override.params(args: T.untyped, kwargs: T.untyped).void }
  def render(*args, **kwargs)
    if kwargs.include?(:component)
      name = T.let(kwargs.fetch(:component), String)
      _render_component(name, **kwargs.slice(:props, :variables))
    else
      super
    end
  end

  private

  # == Helpers ==
  sig do
    params(
      name: String,
      props: T::Hash[String, T.untyped],
      variables: T::Hash[String, T.untyped],
    ).void
  end
  def _render_component(name, props: {}, variables: {})
    query_name = "#{name}Query"
    query_file =
      Rails.root.join(
        "app/views",
        controller_path,
        "queries",
        "#{query_name}.graphql",
      )
    if File.exist?(query_file)
      document = GraphQL.parse_file(query_file)
      props["data"] = Schema.execute(document: document, variables: variables)
      props["variables"] = variables
    end
    @component_name = T.let(@component_name, T.nilable(String))
    @component_name = name
    @component_props =
      T.let(@component_props, T.nilable(T::Hash[String, T.untyped]))
    @component_props = props
    render("layouts/component")
  end

  # == Exceptions ==
  # sig { params(exception: Exception).void }
  # def show_unauthorized(exception)
  #   raise exception if request.local?
  #   render("pages/401", status: :unauthorized)
  # end

  # == Filters ==
  sig { void }
  def set_honeybadger_context
    # current_user.try! do |user|
    #   user = T.let(user, User)
    #   Honeybadger.context(user_id: user.id, user_email: user.email)
    # end
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

# == Devise ==
#class ApplicationController
#  extend T::Sig
#
#  # == Filters ==
#  before_action :store_user_location!, if: :storable_location?
#
#  # == Helpers ==
#  include DeviseHelper
#  include AdminHelper
#
#  private
#
#  # == Helpers ==
#  # - The request method is not GET (non idempotent).
#  # - The request is handled by a Devise controller such as
#  #   Devise::SessionsController as that could cause an infinite redirect loop.
#  # - The request is an Ajax request as this can lead to very unexpected
#  #   behaviour.
#  sig { returns(T::Boolean) }
#  def storable_location?
#    request.get? && is_navigational_format? && !turbo_frame_request? &&
#      !request.xhr? && !devise_controller?
#  end
#
#  sig { void }
#  def store_user_location!
#    store_location_for(:user, request.fullpath)
#  end
#end
