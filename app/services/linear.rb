# typed: strict
# frozen_string_literal: true

class Linear < ApplicationService
  # == Initialization
  sig { void }
  def initialize
    super
    @credentials = T.let(@credentials, T.nilable(OAuthCredentials))
    @client = T.let(@client, T.nilable(Graphlient::Client))
  end

  # == Methods: Service
  sig { override.returns(T::Boolean) }
  def ready?
    return false unless super
    @credentials.present?
  end

  sig { override.void }
  def start
    super
    @credentials = OAuthCredentials.linear
    @client = @credentials.try! do |credentials|
      credentials = T.let(credentials, OAuthCredentials)
      build_client(credentials:)
    end
  end

  # == Methods
  sig { returns(OAuthCredentials) }
  def credentials
    @credentials or raise "Not authenticated (missing credentials)"
  end

  sig { returns(Graphlient::Client) }
  def client
    @client ||= build_client(credentials:)
  end

  sig do
    params(
      title: String,
      description: T.nilable(String),
    ).returns(T.untyped)
  end
  def create_issue(title:, description: nil)
    response = client.query(
      <<~GQL,
        mutation($input: IssueCreateInput!) {
          payload: issueCreate(input: $input) {
            issue {
              id
              url
              title
              description
            }
          }
        }
      GQL
      {
        "input" => {
          "teamId" => team_id,
          "stateId" => triage_state_id,
          "title" => title,
          "description" => description,
        },
      },
    )
    data = unwrap_response!(response)
    data.payload.issue
  end

  private

  # == Helpers
  sig { returns(String) }
  def team_id
    T.must(self.class.team_id)
  end

  sig { returns(T.nilable(String)) }
  def triage_state_id
    return @triage_state_id if defined?(@triage_state_id)
    @triage_state_id = T.let(@triage_state_id, T.nilable(String))
    @triage_state_id = scoped do
      response = client.query(
        <<~GQL,
          query($teamId: String!) {
            team(id: $teamId) {
              triageIssueState {
                id
              }
            }
          }
        GQL
        {
          "teamId" => team_id,
        },
      )
      data = unwrap_response!(response)
      data.team.triage_issue_state&.id
    end
  end

  sig { params(credentials: OAuthCredentials).returns(Graphlient::Client) }
  def build_client(credentials:)
    Graphlient::Client.new(
      "https://api.linear.app/graphql",
      headers: {
        "Authorization" => "Bearer #{credentials.access_token}",
      },
    )
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
    # == Methods: Service
    sig { override.returns(T::Boolean) }
    def enabled?
      return !!@enabled if defined?(@enabled)
      @enabled = T.let(@enabled, T.nilable(T::Boolean))
      @enabled = T.let(super, T::Boolean) && team_id.present?
    end

    # == Methods
    sig { returns(OAuthCredentials) }
    def credentials = instance.credentials

    sig { returns(T.nilable(String)) }
    def team_id
      return @team_id if defined?(@team_id)
      @team_id = T.let(@team_id, T.nilable(String))
      @team_id = ENV.fetch("LINEAR_TEAM_ID")
    end

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
