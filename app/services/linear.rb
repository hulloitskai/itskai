# typed: strict
# frozen_string_literal: true

class Linear < ApplicationService
  # == Constants
  Adapter = T.let(
    GraphQL::Client::HTTP.new("https://api.linear.app/graphql") do
      # rubocop:disable Style/MethodCallWithArgsParentheses
      T.bind(self, T.class_of(GraphQL::Client::HTTP))

      extend T::Sig

      sig { params(context: T.untyped).returns(T::Hash[String, String]) }
      def headers(context)
        {}.tap do |headers|
          Linear.access_token.try! do |token|
            headers["Authorization"] = "Bearer #{token}"
          end
        end
      end

      # rubocop:enable Style/MethodCallWithArgsParentheses
    end,
    GraphQL::Client::HTTP,
  )

  Schema = T.let(
    GraphQL::Client.load_schema("config/linear/schema.generated.json"),
    T.untyped,
  )

  Client = T.let(
    GraphQL::Client.new(schema: Schema, execute: Adapter),
    GraphQL::Client,
  )

  # == Operations
  TriageStateQuery = T.let(
    Client.parse(
      <<~GQL,
        query($teamId: String!) {
          team(id: $teamId) {
            triageIssueState {
              id
            }
          }
        }
      GQL
    ),
    GraphQL::Client::OperationDefinition,
  )

  CreateIssueMutation = T.let(
    Client.parse(
      <<~GQL,
        mutation($input: IssueCreateInput!) {
          payload: issueCreate(input: $input) {
            issue {
              id
              title
              description
              state {
                id
              }
            }
          }
        }
      GQL
    ),
    GraphQL::Client::OperationDefinition,
  )

  # == Methods
  sig { returns(T.nilable(String)) }
  def access_token
    return @access_token if defined?(@access_token)
    @access_token = T.let(@access_token, T.nilable(String))
    @access_token = OAuthCredentials.linear&.access_token
  end

  sig { returns(String) }
  def team_id
    return T.must(@team_id) if defined?(@team_id)
    @team_id = T.let(@team_id, T.nilable(String))
    @team_id = ENV.fetch("LINEAR_TEAM_ID")
  end

  sig do
    params(
      title: String,
      description: T.nilable(String),
    ).returns(T.untyped)
  end
  def create_issue(title:, description: nil)
    response = Client.query(CreateIssueMutation, variables: {
      "input" => {
        "teamId" => team_id,
        "stateId" => triage_state_id,
        "title" => title,
        "description" => description,
      },
    })
    data = unwrap_response!(response)
    data.payload.issue
  end

  private

  # == Helpers
  sig { returns(T.nilable(String)) }
  def triage_state_id
    return @triage_state_id if defined?(@triage_state_id)
    @triage_state_id = T.let(@triage_state_id, T.nilable(String))
    @triage_state_id = scoped do
      response = Client.query(TriageStateQuery, variables: {
        "teamId" => team_id,
      })
      data = unwrap_response!(response)
      data.team.triage_issue_state&.id
    end
  end

  sig { params(response: GraphQL::Client::Response).returns(T.untyped) }
  def unwrap_response!(response)
    if response.errors.any?
      raise response.errors.first
    end
    response.data
  end
end

class Linear
  class << self
    # == Methods
    sig { returns(T.nilable(String)) }
    def access_token = instance.access_token

    sig { returns(String) }
    def team_id = instance.team_id

    sig do
      params(
        title: String,
        description: T.nilable(String),
      ).returns(T.untyped)
    end
    def create_issue(
      title:,
      description: nil
    ) = instance.create_issue(title:, description:)
  end
end
