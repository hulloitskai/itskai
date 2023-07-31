# typed: true
# frozen_string_literal: true

class GraphQLController < ApplicationController
  include GraphQL::Helpers

  # == Configuration
  protect_from_forgery with: :null_session, only: :execute

  # == Actions
  # POST /graphql
  def execute
    # Parse params
    operation_name = params["operationName"]
    unless operation_name.nil?
      raise "operationName must be a String" unless operation_name.is_a?(String)
    end
    query = params[:query]
    unless query.nil?
      raise "query must be a String" unless query.is_a?(String)
    end

    # Execute query
    variables = prepare_variables(params[:variables])
    extensions = prepare_extensions(params[:extensions])
    context = { controller: self, extensions:, current_user: }
    result = Schema.execute(query, variables:, operation_name:, context:)

    # Render result
    render(json: result)
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  sig { params(error: StandardError).returns(T.untyped) }
  def handle_error_in_development(error)
    logger.error(error.message)
    logger.error((error.backtrace || []).join("\n"))
    render(
      json: {
        errors: [{ message: error.message, backtrace: error.backtrace }],
        data: {},
      },
      status: :internal_server_error,
    )
  end
end
