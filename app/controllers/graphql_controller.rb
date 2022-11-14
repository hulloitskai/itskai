# typed: strict
# frozen_string_literal: true

class GraphQLController < ApplicationController
  extend T::Sig

  # == Configuration ==
  protect_from_forgery with: :null_session, only: :execute

  # == Modules ==
  include GraphQL::Helpers

  # == Actions ==
  sig { void }
  def execute
    operation_name = params["operationName"]
    unless operation_name.nil?
      raise "operationName must be a String" unless operation_name.is_a?(String)
    end
    query = params[:query]
    unless query.nil?
      raise "query must be a String" unless query.is_a?(String)
    end

    variables = prepare_variables(params[:variables])
    extensions = prepare_extensions(params[:extensions])
    context = { extensions: extensions, current_user: current_user }

    result =
      Schema.execute(
        query,
        variables: variables,
        operation_name: operation_name,
        context: context,
      )
    render(json: result)
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  sig { params(e: StandardError).returns(T.untyped) }
  def handle_error_in_development(e)
    logger.error(e.message)
    logger.error((e.backtrace || []).join("\n"))
    render(
      json: {
        errors: [{ message: e.message, backtrace: e.backtrace }],
        data: {},
      },
      status: :internal_server_error,
    )
  end
end
