# typed: true
# frozen_string_literal: true

class GraphQLController < ApplicationController
  include GraphQLEntrypoint

  # == Configuration
  protect_from_forgery with: :null_session

  # == Actions
  # GET /graphiql
  def graphiql
    render(inertia: "GraphiQLPage")
  end

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
    context = {
      controller: self,
      headers: request.headers,
      cookies:,
      extensions:,
      current_user:,
    }
    result = Schema.execute(query, variables:, operation_name:, context:)

    # Render result
    render(json: result)
  end
end
