# typed: strict
# frozen_string_literal: true

class Linear
  module Operations
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
  end
end
